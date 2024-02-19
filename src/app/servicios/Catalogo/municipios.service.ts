import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  vu: any = JSON.parse(atob(localStorage.getItem("usuario")!)).id_usuario

  constructor(private http: HttpClient) { }

  GetMunicipios() {
    return this.http.post<any>(environment.Url + 'Municipios/Read', { VA: "list" });
  }

  GetMunicipiosCombo() {
    return this.http.post<any>(environment.Url + 'Municipios/Read', { VA: "bycombo" });
  }

  GetMunicipiosById(id_municipio: number) {
    return this.http.post<any>(environment.Url + 'Municipios/Read', { VA: "byid", id_municipio: id_municipio });
  }

  PostGuardarMunicipios(municipio: any) {
    return this.http.post<any>(environment.Url + 'Municipios/Write', { VA: "bysystem", VU: this.vu, ...municipio });
  }

  PostEliminarMunicipios(id_municipio: number) {
    return this.http.post<any>(environment.Url + 'Municipios/Delete', { VA: "bysystem", VU: this.vu, id_municipio: id_municipio });
  }
}
