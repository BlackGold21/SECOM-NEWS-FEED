import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { EntesService } from 'src/app/servicios/Catalogo/entes.service';
import { AuthGuardService } from 'src/app/shared/services';
import notify from 'devextreme/ui/notify';
import { globals } from 'src/app/shared/globals';
import { MunicipiosService } from 'src/app/servicios/Catalogo/municipios.service';

@Component({
  selector: 'app-captura-entes',
  templateUrl: './captura-entes.component.html',
  styleUrls: ['./captura-entes.component.scss']
})
export class CapturaEntesComponent implements OnInit {


  @ViewChild(DxFormComponent, { static: false })
  form!: DxFormComponent;
  constructor(
    private auth_gurad_service: AuthGuardService,
    private route: ActivatedRoute,
    private entes_service: EntesService,
    private municipios_service: MunicipiosService
  ) {
    // globals.cargando(true).subscribe(data => {
    //   this.cargando = data;
    // });
  }

  disable_ente = true;

  Entes: any = {};
  municipios = []
  cargando = true;

  ngOnInit() {
    this.municipios_service.GetMunicipiosCombo().subscribe(data => {
      this.municipios = data
    })

    if (history.state.id_ente != 0 && history.state.id_ente != undefined) {
      this.entes_service.GetEntesById(history.state.id_ente).subscribe(data => {
        this.Entes = data[0]
        this.cargando = false
      })
    }
    else {
      this.Entes.id_ente = 0
      this.cargando = false
    }
  }
  Grabar() {
    if (!this.form.instance.validate().isValid) return;
    this.entes_service.PostGuardarEntes(this.Entes).subscribe(data => {
      notify(globals.default_notify(data));
      notify(globals.default_notify(data));
      this.Limpiar();
    })
  }
  Limpiar() {
    this.form.instance.resetValues();
  }
  Regresar() {
    window.history.back
  }

}
