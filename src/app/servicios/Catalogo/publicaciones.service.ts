import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  vu: any = JSON.parse(atob(localStorage.getItem("usuario")!)).id_usuario

  constructor(private http: HttpClient) { }

  GetPublicaciones() {
    return this.http.post<any>(environment.Url + 'Publicaciones/Read', { VA: "list" });
  }

  GetPublicacionesById(id_publicacion: number) {
    return this.http.post<any>(environment.Url + 'Publicaciones/Read', { VA: "byid", id_publicacion: id_publicacion });
  }

  PostGuardarPublicaciones(publicacion: any) {
    return this.http.post<any>(environment.Url + 'Publicaciones/Write', { VA: "bysystem", VU: this.vu, ...publicacion });
  }

  PostEliminarPublicaciones(id_publicacion: number) {
    return this.http.post<any>(environment.Url + 'Publicaciones/Delete', { VA: "bysystem", VU: this.vu, id_publicacion: id_publicacion });
  }
}
