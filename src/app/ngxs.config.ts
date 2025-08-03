import { isDevMode } from '@angular/core';
import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { NgxsModuleOptions } from '@ngxs/store';
import { AppState } from './app.state';
import { APP_STATE_TOKEN } from './app.state.const';

export const ngxsModuleOptions: NgxsModuleOptions = {
  developmentMode: !isDevMode(),
};

export const ngxsStorageConfig: NgxsStoragePluginOptions = {
  // Hier werden alle States persistent in Localstorage des Gerätes gespeichert
  keys: [APP_STATE_TOKEN],
};

// Hier werden alle States in Angular bereitgestellt
export const states = [AppState];
