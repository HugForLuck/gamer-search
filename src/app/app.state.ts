import { inject, Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
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

  @Selector()
  static isLoading(state: AppStateModel): boolean {
    return state.isLoading;
  }

  @Action(AppActions.CheckAuth)
  async checkAuth(ctx: Context) {
    // Set loading to true. The UI will now show the splashscreen.
    ctx.patchState({ isLoading: true });

    try {
      const accessCode = this.router.getUrlAccessCode();
      this.router.removeCodeFromUrl(
        new URLSearchParams(window.location.search)
      );
      const hasAccess = await this.auth.checkAccessAndSignIn(accessCode);

      if (hasAccess) {
        return ctx.dispatch(new AppActions.AuthSuccess());
      } else {
        return ctx.dispatch(new AppActions.AuthError());
      }
    } catch (error) {
      console.error('Authentication check failed', error);
      return ctx.dispatch(new AppActions.AuthError());
    }
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
