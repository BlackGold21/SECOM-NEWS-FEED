import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EntesService {

  vu: any = JSON.parse(atob(localStorage.getItem("usuario")!)).id_usuario

  constructor(private http: HttpClient) { }

  GetEntes() {
    return this.http.post<any>(environment.Url + 'Entes/Read', { VA: "list" });
  }

  GetEntesById(id_ente: number) {
    return this.http.post<any>(environment.Url + 'Entes/Read', { VA: "byid", id_ente: id_ente });
  }

  PostGuardarEntes(ente: any) {
    return this.http.post<any>(environment.Url + 'Entes/Write', { VA: "bysystem", VU: this.vu, ...ente });
  }

  PostEliminarEntes(id_ente: number) {
    return this.http.post<any>(environment.Url + 'Entes/Delete', { VA: "bysystem", VU: this.vu, id_ente: id_ente });
  }
}
