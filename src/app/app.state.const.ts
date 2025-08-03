import { StateToken, ɵStoreOptions } from '@ngxs/store/internals';
import { AppStateModel } from './app.state.model';

export const APP_STATE_DEFAULTS: AppStateModel = {
  isLoading: true,
  isSignedIn: false,
};

export const APP_STATE_TOKEN = new StateToken<AppStateModel>('app');

export const APP_STATE_OPTIONS: ɵStoreOptions<AppStateModel> = {
  name: APP_STATE_TOKEN,
  defaults: APP_STATE_DEFAULTS,
};
