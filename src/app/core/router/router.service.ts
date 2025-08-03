import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngxs/store';
import { ROUTE } from './routes.const';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private actions$ = inject(Actions);
  private router = inject(Router);

  /**
   * Gibt den Wert des Codes in der Url zurück
   * @returns code
   */
  getUrlAccessCode(): string {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    return code ?? '';
  }

  /**
   * Entfernt den code parameter, da er nur bei erstmaliger
   * Authentificierung benötigt wird
   * @param params Die URL
   */
  removeCodeFromUrl(params: URLSearchParams) {
    if (params.has('code')) {
      params.delete('code');
      const newQueryString = params.toString();
      // Baue die neue URL zusammen. Wenn keine Parameter mehr übrig sind,
      // bleibt nur der Pfadname.
      const newUrl = newQueryString
        ? `${window.location.pathname}?${newQueryString}`
        : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }

  toSplashscreen() {
    this.router.navigate(ROUTE.SPLASHSCREEN);
  }

  // constructor() {
  //   this.checkAppIsLoading();
  // }

  // checkAppIsLoading() {
  //   this.actions$
  //     .pipe(
  //       ofActionDispatched(AppActions.StartLoading),
  //       tap(({ hasLoaded, isSignedIn }) => {
  //         if (!hasLoaded) {
  //           this.router.navigate([ROUTE.SPLASHSCREEN]);
  //           return;
  //         }

  //         if (isSignedIn) {
  //           this.router.navigate([ROUTE.HOME]);
  //         } else {
  //           this.router.navigate([ROUTE.NO_PERMISSION]);
  //         }
  //       })
  //     )
  //     .subscribe();
  // }
}
