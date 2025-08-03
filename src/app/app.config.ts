import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { environment } from '../environments/environment.development';
import { checkAuth } from './app.helper';
import { routes } from './app.routes';
import { ngxsModuleOptions, ngxsStorageConfig, states } from './ngxs.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(async () => await checkAuth()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStore(
      states,
      ngxsModuleOptions,
      withNgxsLoggerPlugin(),
      withNgxsStoragePlugin(ngxsStorageConfig),
      withNgxsRouterPlugin()
    ),
  ],
};
