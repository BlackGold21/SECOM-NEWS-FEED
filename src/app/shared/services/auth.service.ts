import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/enviroment/enviroment';

export interface IUser {
  email: string;
  avatarUrl?: string;
}

const defaultPath = '/';
const defaultUser = {
  id_usuario: '',
  usuario: '',
  password: '',
  nombre: '',
  token: ''
};

@Injectable()
export class AuthService {
  private _user = defaultUser;
  get loggedIn(): boolean {
    if (this._user.usuario == '') {
      return false;
    }
    return !(this._user.usuario == '');
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  Login() {
    return this.http.post<any>(environment.Url + 'Login', this._user)
  }
  async logIn(usuario: string, password: string) {

    this._user.usuario = usuario;
    this._user.password = password
    this.Login().toPromise().then(data => {
      this._user.id_usuario = data.id_usuario;
      this._user.usuario = data.usuario;
      this._user.password = '';
      this._user.nombre = data.usuario;
      this._user.token = data.token;

      localStorage.setItem('token', this._user.token);
      localStorage.setItem('usuario', btoa(JSON.stringify(this._user)));

      window.location.reload();
      this.router.navigate([this._lastAuthenticatedPath])
    });
  }

  async getUser() {
    try {
      // Send request
      if (localStorage.getItem("usuario") == null || localStorage.getItem("usuario") == undefined) {
        this._user = {
          id_usuario: '',
          usuario: '',
          password: '',
          token: '',
          nombre: ''
        }
      }
      else {
        this._user = JSON.parse(atob(localStorage.getItem("usuario")!));
      }
      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  getToken() {
    this.getUser();
    return (this._user.token == null && this._user.token == undefined) ? false : this._user.token;
  }

  getUserName() {
    this.getUser();
    return (localStorage.getItem("usuario") == undefined) ? '' : this._user.usuario;
  }

  getUserID() {
    this.getUser();
    return (localStorage.getItem("usuario") == undefined) ? '' : this._user.id_usuario;
  }

  CambiarPassword(usuario: any) {
    var id_usuario: any = JSON.parse(atob(localStorage.getItem("usuario")!)).id_usuario
    return this.http.post<any>(environment.Url + 'Usuarios/Write', { VA: "bypassword", id_usuario: id_usuario, ...usuario })
  }

  async logOut() {
    localStorage.removeItem("usuario");
    window.location.reload();
    this.router.navigate(['/login-form']);
  }
  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }


}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

 public titulo_componente!: Observable<String>
  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.authService.getUser();
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
