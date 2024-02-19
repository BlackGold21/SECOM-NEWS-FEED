import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  
  vu: any = JSON.parse(atob(localStorage.getItem("usuario")!)).id_usuario

  constructor(private http: HttpClient) { }

  GetProyectos() {
    return this.http.post<any>(environment.Url + 'Proyectos/Read', { VA: "list" });
  }

  GetProyectosById(id_proyecto: number) {
    return this.http.post<any>(environment.Url + 'Proyectos/Read', { VA: "byid", id_proyecto: id_proyecto });
  }

  PostGuardarProyectos(proyecto: any) {
    return this.http.post<any>(environment.Url + 'Proyectos/Write', { VA: "bysystem", VU: this.vu, ...proyecto });
  }

  PostEliminarProyectos(id_proyecto: number) {
    return this.http.post<any>(environment.Url + 'Proyectos/Delete', { VA: "bysystem", VU: this.vu, id_proyecto: id_proyecto });
  }
}
