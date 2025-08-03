import { isDevMode } from '@angular/core';
import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { NgxsModuleOptions } from '@ngxs/store';
import { AppState } from './app.state';

export const ngxsModuleOptions: NgxsModuleOptions = {
  developmentMode: !isDevMode(),
};

export const ngxsStorageConfig: NgxsStoragePluginOptions = {
  // Nur die 'isSignedIn'-Eigenschaft des 'app'-Zustands persistieren.
  keys: ['app.isSignedIn'],
};

// Hier werden alle States in Angular bereitgestellt
export const states = [AppState];
