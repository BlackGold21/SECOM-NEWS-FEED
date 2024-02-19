import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { PublicacionesService } from 'src/app/servicios/Catalogo/publicaciones.service';
import { globals } from 'src/app/shared/globals';
import { AuthGuardService } from 'src/app/shared/services';

@Component({
  selector: 'app-consulta-publicaciones',
  templateUrl: './consulta-publicaciones.component.html',
  styleUrls: ['./consulta-publicaciones.component.scss']
})

export class ConsultaPublicacionesComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  focusedRowKey: any;

  cargando = true;
  popup_visible = false;
  publicaciones: any[] = [];

  constructor(private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private router: Router,
    private Publicaciones_service: PublicacionesService) { }

  ngOnInit(): void {
    this.auth_gurad_service.titulo_componente = this.route.snapshot.data['titulo'];
    this.Publicaciones_service.GetPublicaciones().subscribe(data => {
      console.log(data.Table );
      this.publicaciones = data.Table;
    })
  }
  Nuevo() {
    this.router.navigateByUrl("/captura-publicaciones", { state: { id_publicacion: 0 } })
  }
  Editar = (e: any) => {
    this.dataGrid.instance.getSelectedRowsData().then(rowData => {
      this.router.navigateByUrl("/captura-publicaciones", { state: { id_publicacion: rowData[0].id_publicacion } });
      console.log(rowData);    });
    e.event.preventDefault();
  }

  Eliminar() {
    this.Publicaciones_service.PostEliminarPublicaciones(this.focusedRowKey).subscribe(data => {
      this.popup_visible = false;
      notify(globals.default_notify(data));
      this.Publicaciones_service.GetPublicaciones().subscribe(data => {
        this.publicaciones = data;
      });
    });
  }


  MostrarPopup() {
    this.popup_visible = true;
  }

  Regresar() {
    window.history.back();
  }

}
