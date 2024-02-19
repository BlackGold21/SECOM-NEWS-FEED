import { ActivatedRoute } from '@angular/router';
import { AuthGuardService } from './../../../../shared/services/auth.service';
import { UsuariosService } from '../../../../servicios/Catalogo/usuarios.service';
import { DxFormComponent } from 'devextreme-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { globals } from 'src/app/shared/globals';

@Component({
  selector: 'app-captura-usuarios',
  templateUrl: './captura-usuarios.component.html',
  styleUrls: ['./captura-usuarios.component.scss']
})
export class CapturaUsuariosComponent implements OnInit {


  @ViewChild(DxFormComponent, { static: false })
  form!: DxFormComponent;

  constructor(
    private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private usuarios_service: UsuariosService,
  ) {
    // globals.cargando(true).subscribe(data => {
    //   this.cargando = data;
    // });
  }

  disable_usuario = true;

  Usuarios: any = {};

  cargando = true;

  ngOnInit() { // cuado es la iniciar la pantalla 


    this.disable_usuario = false;
    this.Usuarios.id_usuario = 0;


    if (history.state.id_usuario != 0 && history.state.id_usuario != undefined) {

      this.usuarios_service.GetUsuariosById(history.state.id_usuario).subscribe(data => {
        this.Usuarios.usuario = data[0].usuario;
        this.Usuarios.nombre = data[0].nombre;
        this.Usuarios.password = data[0].password;
        this.Usuarios.clave_confirm = data[0].password;

        this.cargando = false;
        this.disable_usuario = true;
      });
    } else {
      this.cargando = false;

    }

  }

  Grabar() {
    if (!this.form.instance.validate().isValid) return;
    if (this.Usuarios.password == "" || this.Usuarios.password == null || this.Usuarios.password == undefined) {
      notify(globals.error_notify("Debe capturar una clave"));
    }
    else if (this.Usuarios.password != this.Usuarios.clave_confirm) {
      notify(globals.error_notify("Las claves no coinciden verificar..."));
    }
    else {
      this.usuarios_service.PostGuardarUsuarios(this.Usuarios).subscribe(data => {
        notify(globals.default_notify(data));
        window.location.reload();
      })
    }
  }

  Limpiar() {
    this.form.instance.resetValues();
    setTimeout(() => {
      this.Usuarios.nuevo = true
      this.disable_usuario = false;
    });

  }

  Regresar() {
    window.history.back();
  }

}
