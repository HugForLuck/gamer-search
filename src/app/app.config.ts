import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "gamer-search", appId: "1:692620794947:web:79d17bc46bed9034e588f6", storageBucket: "gamer-search.firebasestorage.app", apiKey: "AIzaSyCaxy4ZxYOiSfhkTA5aJKehQBOjXNqGmEc", authDomain: "gamer-search.firebaseapp.com", messagingSenderId: "692620794947" })), provideFirestore(() => getFirestore())
  ]
};
