import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';



@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  vu: any = JSON.parse(atob(localStorage.getItem("usuario")!)).id_usuario

  constructor(private http: HttpClient) { }

  GetActividades() {
    return this.http.post<any>(environment.Url + 'Actividades/Read', { VA: "list" });
  }

  GetActividadescombo() {
    return this.http.post<any>(environment.Url + 'Actividades/Read', { VA: "bycombo"});
  }

  GetActividadesById(id_actividad: number) {
    return this.http.post<any>(environment.Url + 'Actividades/Read', { VA: "byid", id_actividad: id_actividad });
  }

  PostGuardarActividades(actividad: any) {
    return this.http.post<any>(environment.Url + 'Actividades/Write', { VA: "bysystem", VU: this.vu, ...actividad });
  }

  PostEliminarActividades(id_actividad: number) {
    return this.http.post<any>(environment.Url + 'Actividades/Delete', { VA: "bysystem", VU: this.vu, id_actividad: id_actividad });
  }
}