import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ActividadesService } from 'src/app/servicios/Catalogo/actividades.service';
import { PublicacionesService } from 'src/app/servicios/Catalogo/publicaciones.service';
import { globals } from 'src/app/shared/globals';
import { AuthGuardService } from 'src/app/shared/services';

@Component({
  selector: 'app-captura-publicaciones',
  templateUrl: './captura-publicaciones.component.html',
  styleUrls: ['./captura-publicaciones.component.scss']
}) export class CapturaPublicacionesComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  @ViewChild(DxFormComponent, { static: false })
  form!: DxFormComponent;
  constructor(
    private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private publicaciones_service: PublicacionesService,
    private actividades_service: ActividadesService,

  ) {
    // globals.cargando(true).subscribe(data => {
    //   this.cargando = data;
    // });
  }

  disable_publicacion = true;
  publicaciones: any = {};
  actividades: any[] = [];
  cargando = true;
  onInitialized(e: any) {
    e.component.columnOption("command:select", "visibleIndex", 11);
  }
  ngOnInit() {

    this.auth_gurad_service.titulo_componente = this.route.snapshot.data['titulo'];
    this.actividades_service.GetActividades().subscribe(data => {
      this.actividades = data.Table;
    })

    if (history.state.id_publicacion != 0 && history.state.id_publicacion != undefined) {
      this.publicaciones_service.GetPublicacionesById(history.state.id_publicacion).subscribe(data => {
        console.log(data.Table[0]);
        this.publicaciones = data.Table[0];
        this.cargando = false
      })
    }
    else {
      this.publicaciones.id_publicacion = 0
      this.cargando = false
    }
  }


  Grabar() {
    if (!this.form.instance.validate().isValid) return;
    this.dataGrid.instance.getSelectedRowsData().then(data => {
      this.publicaciones.detalle = data;
      this.publicaciones_service.PostGuardarPublicaciones(this.publicaciones).subscribe(data => {
        notify(globals.default_notify(data));
        this.Limpiar();
      })
    })

  }
  Limpiar() {
    this.form.instance.resetValues();
  }
  Regresar() {
    window.history.back();
  }
}