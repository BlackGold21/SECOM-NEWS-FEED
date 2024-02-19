import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ActividadesService } from 'src/app/servicios/Catalogo/actividades.service';
import { EntesService } from 'src/app/servicios/Catalogo/entes.service';
import { ProyectosService } from 'src/app/servicios/Catalogo/proyectos.service';
import { globals } from 'src/app/shared/globals';
import { AuthGuardService } from 'src/app/shared/services';

@Component({
  selector: 'app-captura-actividades',
  templateUrl: './captura-actividades.component.html',
  styleUrls: ['./captura-actividades.component.scss']
})
export class CapturaActividadesComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false })
  form!: DxFormComponent;
  constructor(
    private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private entes_service: EntesService,
    private proyectos_service: ProyectosService,
    private actividades_service: ActividadesService,
  ) {
    // globals.cargando(true).subscribe(data => {
    //   this.cargando = data;
    // });
  }

  disable_actividad = true;
  tipos: any[] = [
    {
      id: 0,
      text: "Ente"

    },
    {
      id: 1,
      text: "Proyecto"
    },
  ];
  Actividades: any = {
  tipomov:0
  };
  ente: any[] = [];
  proyecto: any[] = [];
  VisibleEnte = false;
  VisibleProyecto = true;
  cargando = true;

  ngOnInit() {

    this.entes_service.GetEntes().subscribe(data => {
      this.ente = data
    })
    this.proyectos_service.GetProyectos().subscribe(data => {
      this.proyecto = data
    })
    



    if (history.state.id_actividad != 0 && history.state.id_actividad != undefined) {
      this.actividades_service.GetActividadesById(history.state.id_actividad).subscribe(data => {
        this.Actividades = data.Table[0];
        if (this.Actividades.id_ente==0){
          this.Actividades.tipomov=1;
        }
        else if(this.Actividades.id_proyecto==0){
          this.Actividades.tipomov=0;
        }
        this.cargando = false
      })
    }
    else {
      this.Actividades.id_actividad = 0
      this.cargando = false
    }
  }
  cambiatipo = (e: any) => {
 
    console.log(e)
    if (e.value == 0) {
      this.VisibleEnte = false;
      this.VisibleProyecto = true;
    }
    else{
      this.VisibleEnte = true;
      this.VisibleProyecto = false;
    }
  }
  valueChangedTipo = () => {}
  Grabar() {
    if (!this.form.instance.validate().isValid) return;
    this.actividades_service.PostGuardarActividades(this.Actividades).subscribe(data => {
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