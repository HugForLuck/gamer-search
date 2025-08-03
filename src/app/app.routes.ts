import { Routes } from '@angular/router';
import { Splashscreen } from './features/splashscreen/splashscreen';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'splashscreen',
    component: Splashscreen,
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/unauthorized/unauthorized').then(
        (m) => m.Unauthorized
      ),
  },
];
