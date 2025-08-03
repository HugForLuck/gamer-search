import { inject, Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AppActions } from './app.actions';
import { APP_STATE_OPTIONS } from './app.state.const';
import { AppStateModel } from './app.state.model';
import { AuthService } from './core/auth/auth.service';
import { RouterService } from './core/router/router.service';
import { ROUTE } from './core/router/routes.const';

type Context = StateContext<AppStateModel>;

@State<AppStateModel>(APP_STATE_OPTIONS)
@Injectable()
export class AppState {
  private auth = inject(AuthService);
  private router = inject(RouterService);
  private store = inject(Store);
  @Selector()
  static hasLoaded(state: AppStateModel): boolean {
    return state.isLoading;
  }

  @Action(AppActions.CheckAuth)
  async checkAuth(ctx: Context) {
    try {
      const accessCode = this.router.getUrlAccessCode();
      ctx.dispatch(new AppActions.StartLoading());
      const hasAccess = await this.auth.checkAccessAndSignIn(accessCode);

      console.log('hasAccess: ', hasAccess);

      if (hasAccess) {
        this.store.dispatch(new AppActions.AuthSuccess());
      } else {
        this.store.dispatch(new AppActions.AuthError());
      }
    } catch (error) {
      console.error('Authentication check failed', error);
      this.store.dispatch(new AppActions.AuthError());
    }
  }

  @Action(AppActions.StartLoading)
  startLoading(ctx: Context) {
    ctx.patchState({ isLoading: true });
    return this.router.toSplashscreen();
  }

  @Action(AppActions.AuthSuccess)
  authSuccess(ctx: Context) {
    ctx.patchState({
      isLoading: false,
      isSignedIn: true,
    });

    ctx.dispatch(new Navigate(ROUTE.HOME));
  }

  @Action(AppActions.AuthError)
  authError(ctx: Context) {
    ctx.patchState({
      isLoading: false,
      isSignedIn: false,
    });

    ctx.dispatch(new Navigate(ROUTE.UNAUTHORIZED));
  }
}
