import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private auth_service: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth_service.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth_service.getToken()}`
        },
        body: {
          ...request.body, VU: this.auth_service.getUserID()
        }
      });

      // if (!request.headers.has('Content-Type')) {
      //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded') }); //application/json
      // }

      // request = request.clone({ headers: request.headers.set('Accept', '*/*') }); //application/json
      // request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Authorization, Expires, Pragma, DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range') });

      

    }
    return next.handle(request);
  }
}

