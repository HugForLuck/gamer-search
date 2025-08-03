export namespace AppActions {
  export class CheckAuth {
    static readonly type = '[App] Check Authentication';
  }

  export class AuthSuccess {
    static readonly type = '[App] Auth Success';
  }

  export class AuthError {
    static readonly type = '[App] Auth Error';
  }
}
