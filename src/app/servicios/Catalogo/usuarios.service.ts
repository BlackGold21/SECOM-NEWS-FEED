import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  vu: any = JSON.parse(atob(localStorage.getItem("usuario")!)).id_usuario

  constructor(private http: HttpClient) { }

  GetUsuarios() {
    return this.http.post<any>(environment.Url + 'Usuarios/Read', { VA: "list" });
  }

  GetUsuariosById(id_usuario: number) {
    return this.http.post<any>(environment.Url + 'Usuarios/Read', { VA: "byid", id_usuario: id_usuario });
  }

  PostGuardarUsuarios(usuario: any) {
    return this.http.post<any>(environment.Url + 'Usuarios/Write', { VA: "bysystem", VU: this.vu, ...usuario });
  }

  PostEliminarUsuarios(id_usuario: number) {
    return this.http.post<any>(environment.Url + 'Usuarios/Delete', { VA: "bysystem", VU: this.vu, id_usuario: id_usuario });
  }
}
