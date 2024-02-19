import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ActividadesService } from 'src/app/servicios/Catalogo/actividades.service';
import { globals } from 'src/app/shared/globals';
import { AuthGuardService } from 'src/app/shared/services';

@Component({
  selector: 'app-consulta-actividades',
  templateUrl: './consulta-actividades.component.html',
  styleUrls: ['./consulta-actividades.component.scss']
})
export class ConsultaActividadesComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  focusedRowKey: any;

  cargando = true;
  popup_visible = false;
  actividades: any[] = [];



  constructor(private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private router: Router,
    private actividades_service: ActividadesService) { }

  ngOnInit(): void {
    this.auth_gurad_service.titulo_componente = this.route.snapshot.data['titulo'];
    this.actividades_service.GetActividades().subscribe(data => {
      //console.log(data.Table);
      this.actividades = data.Table;
    })
  }
  Nuevo() {
    this.router.navigateByUrl("/captura-actividades", { state: { id_actividad: 0 } })
  }
  Editar = (e: any) => {
    this.dataGrid.instance.getSelectedRowsData().then(rowData => {
      this.router.navigateByUrl("/captura-actividades", { state: { id_actividad: rowData[0].id_actividad } })
    });
    e.event.preventDefault();
  }

  Eliminar() {
    this.actividades_service.PostEliminarActividades(this.focusedRowKey).subscribe(data => {
      this.popup_visible = false;
      notify(globals.default_notify(data))
      this.actividades_service.GetActividades().subscribe(data => {
        this.actividades = data;
      })
    })
  }


  MostrarPopup() {
    this.popup_visible = true;
  }

  Regresar() {
    window.history.back();
  }

}
