import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Secret } from './firestore.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private secretDocPath = 'appConfig/secrets';

  async getAppCode(): Promise<string | null> {
    const secretDocRef = doc(this.firestore, 'appConfig/secrets');
    const docSnap = await getDoc(secretDocRef);
    const secretData = docSnap.data() as Secret | undefined;
    return secretData?.code ?? null;
  }
}
