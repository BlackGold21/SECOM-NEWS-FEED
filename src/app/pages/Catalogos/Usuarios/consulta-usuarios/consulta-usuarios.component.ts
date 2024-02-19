import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { UsuariosService } from 'src/app/servicios/Catalogo/usuarios.service';
import { AuthGuardService } from 'src/app/shared/services';
import notify from 'devextreme/ui/notify';
import { globals } from 'src/app/shared/globals';

@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.scss']
})
export class ConsultaUsuariosComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  focusedRowKey: any;

  cargando = true;
  popup_visible = false;


  usuarios: any[] = [];

  constructor(private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarios_service: UsuariosService) { }

  ngOnInit(): void {
    this.auth_gurad_service.titulo_componente = this.route.snapshot.data['titulo'];
    this.usuarios_service.GetUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

  Nuevo() {
    this.router.navigateByUrl("/captura-usuarios", { state: { id_usuario: 0 } })
  }

  Editar = (e: any) => {
    this.dataGrid.instance.getSelectedRowsData().then(rowData => {
      this.router.navigateByUrl("/captura-usuarios", { state: { id_usuario: rowData[0].id_usuario } })
    });
    e.event.preventDefault();
  }

  Eliminar() {
    this.usuarios_service.PostEliminarUsuarios(this.focusedRowKey).subscribe(data => {
      this.popup_visible = false;
      notify(globals.default_notify(data))
      this.usuarios_service.GetUsuarios().subscribe(data => {
        this.usuarios = data;
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
