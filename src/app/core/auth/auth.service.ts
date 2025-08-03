import { ApplicationRef, inject, Injectable } from '@angular/core';
import { Auth, authState, signInAnonymously, User } from '@angular/fire/auth';
import { firstValueFrom, map, Observable } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { RouterService } from '../router/router.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(RouterService);
  private appRef = inject(ApplicationRef);
  private firestore = inject(FirestoreService);

  readonly user$: Observable<User | null> = authState(this.auth);
  readonly isSignedIn$ = this.user$.pipe(map((user) => !!user));

  async signIn() {
    try {
      await signInAnonymously(this.auth);
      this.appRef.tick();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Prüft den Zugangscode und führt den anonymen Login durch.
   * @returns Ein Promise, das `true` bei Erfolg und `false` bei Misserfolg auflöst.
   */
  async checkAccessAndSignIn(urlAccessCode: string): Promise<boolean> {
    // Ist der Nutzer bereits angemeldet?
    const IsSignedIn = await firstValueFrom(
      this.user$.pipe(map((user) => !!user))
    );
    if (IsSignedIn) return true;

    // Code aus den URL-Parametern auslesen

    const dbAccessCode = await this.firestore.getAppCode();

    if (urlAccessCode && urlAccessCode === dbAccessCode) {
      try {
        await signInAnonymously(this.auth);
        return true; // Login erfolgreich
      } catch (error) {
        console.error('Anonymous sign-in failed', error);
        return false; // Firebase Fehler
      }
    }

    return false; // Kein oder falscher Code
  }
}
