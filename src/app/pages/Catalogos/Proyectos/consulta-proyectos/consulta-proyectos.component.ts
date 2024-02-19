import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ProyectosService } from 'src/app/servicios/Catalogo/proyectos.service';
import { globals } from 'src/app/shared/globals';
import { AuthGuardService } from 'src/app/shared/services';

@Component({
  selector: 'app-consulta-proyectos',
  templateUrl: './consulta-proyectos.component.html',
  styleUrls: ['./consulta-proyectos.component.scss']
})
export class ConsultaProyectosComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  focusedRowKey: any;

  cargando = true;
  popup_visible = false;

  proyectos: any[] = [];



  constructor(private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private router: Router,
    private proyectos_service: ProyectosService) { }

  ngOnInit(): void {
    this.auth_gurad_service.titulo_componente = this.route.snapshot.data['titulo'];
    this.proyectos_service.GetProyectos().subscribe(data => {
      this.proyectos = data;
    })
  }
  Nuevo() {
    this.router.navigateByUrl("/captura-proyectos", { state: { id_proyecto: 0 } })
  }
  Editar = (e: any) => {
    this.dataGrid.instance.getSelectedRowsData().then(rowData => {
      this.router.navigateByUrl("/captura-proyectos", { state: { id_proyecto: rowData[0].id_proyecto } })
    });
    e.event.preventDefault();
  }

  Eliminar() {
    this.proyectos_service.PostEliminarProyectos(this.focusedRowKey).subscribe(data => {
      this.popup_visible = false;
      notify(globals.default_notify(data))
      this.proyectos_service.GetProyectos().subscribe(data => {
        this.proyectos = data;
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