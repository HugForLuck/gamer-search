import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppActions } from './app.actions';

// Lese den Query-Parameter 'pw' aus der URL
function getUrlCode(): string | null {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  removeCodeFromUrl(params);
  return code;
}

// TODO: Implement in respective service
// Entferne den 'code' Parameter aus der URL, ohne die Seite neu zu laden
function removeCodeFromUrl(params: URLSearchParams) {
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

export const checkAuth = async () => {
  const store = inject(Store);
  store.dispatch(new AppActions.CheckAuth());
  console.log('⛔ AFTER checkAuth() > store.dispatch');
  // inject(RouterService); // lauscht hiermit sofort auf `appHasLoaded` action
  // const firestore = inject(Firestore);
  // const auth = inject(AuthService);
  // const store = inject(Store);
  // store.dispatch(new AppActions.SetAppHasLoaded(false, false));
  // let isSignedIn = await firstValueFrom(auth.isSignedIn$);
  // if (isSignedIn) {
  //   store.dispatch(new AppActions.SetAppHasLoaded(true, isSignedIn));
  //   return;
  // }
  // // Permission war nicht im localstorage, also überprüfe via db neu und vergleiche mit url code
  // const urlCode = getUrlCode();
  // const appCode = await getAppCode(firestore);
  // if (urlCode === appCode) await auth.signIn();
  // isSignedIn = await firstValueFrom(auth.isSignedIn$);
  // store.dispatch(new AppActions.SetAppHasLoaded(true, isSignedIn));
};
