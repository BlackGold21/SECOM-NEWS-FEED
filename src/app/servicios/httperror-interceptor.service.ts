import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { globals } from '../shared/globals';
import { AuthService } from '../shared/services';



@Injectable({
  providedIn: 'root'
})
export class HttperrorInterceptorService {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error de lado del cliente: ${error.error.message}`;
        } else {
          // backend error
          if (error.status == 0) {
            errorMessage = `No se encontro conexion con el servidor de datos: ${error.status} ${error.error}`;
          } else {
            if (error.status == 401) {
              this.auth.logOut();
              errorMessage = `Su sesión ha expirado. ${error.status} ${error.error}`;
            }
            errorMessage = `Error del lado del Servidor: ${error.status} ${error.error}`;
          }
        }

        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        globals.cargando(false).subscribe(data => {
          notify({
            message: errorMessage,
            type: "error",
            width: 400,
            position: { at: 'bottom center', my: 'bottom center', offset: '0 -80' }
          });
        });
        // notify({
        //   message: errorMessage,
        //   type: "error",
        //   width: 400,
        //   position: { at: 'bottom center', my: 'bottom center', offset: '0 -80' }
        // })
        return throwError(errorMessage);
      })
    );
  }
}
