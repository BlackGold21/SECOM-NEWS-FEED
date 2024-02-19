import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ProyectosService } from 'src/app/servicios/Catalogo/proyectos.service';
import { globals } from 'src/app/shared/globals';
import { AuthGuardService } from 'src/app/shared/services';

@Component({
  selector: 'app-captura-proyectos',
  templateUrl: './captura-proyectos.component.html',
  styleUrls: ['./captura-proyectos.component.scss']
})
export class CapturaProyectosComponent implements OnInit {

  @ViewChild(DxFormComponent, { static: false })
  form!: DxFormComponent;
  constructor(
    private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private proyectos_service: ProyectosService,
  ) {
    // globals.cargando(true).subscribe(data => {
    //   this.cargando = data;
    // });
  }

  disable_proyecto = true;

  Proyectos: any = {};
  cargando = true;

  ngOnInit() {

    if (history.state.id_proyecto != 0 && history.state.id_proyecto != undefined) {
      this.proyectos_service.GetProyectosById(history.state.id_proyecto).subscribe(data => {
        this.Proyectos = data[0]
        this.cargando = false
      })
    }
    else {
      this.Proyectos.id_proyecto = 0
      this.cargando = false
    }
  }
  Grabar() {
    if (!this.form.instance.validate().isValid) return;
    this.proyectos_service.PostGuardarProyectos(this.Proyectos).subscribe(data => {
      notify(globals.default_notify(data));
      notify(globals.default_notify(data));
      this.Limpiar();
    })
  }
  Limpiar() {
    this.form.instance.resetValues();
  }
  Regresar() {
    window.history.back();
  }
}