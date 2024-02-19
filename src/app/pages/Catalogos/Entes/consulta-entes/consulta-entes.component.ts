import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { EntesService } from 'src/app/servicios/Catalogo/entes.service';
import { globals } from 'src/app/shared/globals';
import { AuthGuardService } from 'src/app/shared/services';

@Component({
  selector: 'app-consulta-entes',
  templateUrl: './consulta-entes.component.html',
  styleUrls: ['./consulta-entes.component.scss']
})
export class ConsultaEntesComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  focusedRowKey: any;

  cargando = true;
  popup_visible = false;

  entes: any[] = [];



  constructor(private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private router: Router,
    private entes_service: EntesService) { }

  ngOnInit(): void {
    this.auth_gurad_service.titulo_componente = this.route.snapshot.data['titulo'];
    this.entes_service.GetEntes().subscribe(data => {
      this.entes = data;
    })
  }
  Nuevo() {
    this.router.navigateByUrl("/captura-entes", { state: { id_ente: 0 } })
  }
  Editar = (e: any) => {
    this.dataGrid.instance.getSelectedRowsData().then(rowData => {
      this.router.navigateByUrl("/captura-entes", { state: { id_ente: rowData[0].id_ente } })
    });
    e.event.preventDefault();
  }

  Eliminar() {
    this.entes_service.PostEliminarEntes(this.focusedRowKey).subscribe(data => {
      this.popup_visible = false;
      notify(globals.default_notify(data))
      this.entes_service.GetEntes().subscribe(data => {
        this.entes = data;
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
