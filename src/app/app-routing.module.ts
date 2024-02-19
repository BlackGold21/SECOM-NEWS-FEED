import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxPopupModule, DxRadioGroupModule, DxTextAreaModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { HttperrorInterceptorService } from './servicios/httperror-interceptor.service';
import { ConsultaUsuariosComponent } from './pages/Catalogos/Usuarios/consulta-usuarios/consulta-usuarios.component';
import { CapturaUsuariosComponent } from './pages/Catalogos/Usuarios/captura-usuarios/captura-usuarios.component';
import { CapturaEntesComponent } from './pages/Catalogos/Entes/captura-entes/captura-entes.component';
import { ConsultaEntesComponent } from './pages/Catalogos/Entes/consulta-entes/consulta-entes.component';
import { ConsultaProyectosComponent } from './pages/Catalogos/Proyectos/consulta-proyectos/consulta-proyectos.component';
import { CapturaProyectosComponent } from './pages/Catalogos/Proyectos/captura-proyectos/captura-proyectos.component';
import { ConsultaActividadesComponent } from './pages/Catalogos/Actividades/consulta-actividades/consulta-actividades.component';
import { CapturaActividadesComponent } from './pages/Catalogos/Actividades/captura-actividades/captura-actividades.component';
import { ConsultaPublicacionesComponent } from './pages/Catalogos/Publicaciones/consulta-publicaciones/consulta-publicaciones.component';
import { CapturaPublicacionesComponent } from './pages/Catalogos/Publicaciones/captura-publicaciones/captura-publicaciones.component';

const routes: Routes = [
  {
    path: 'captura-publicaciones',
    component: CapturaPublicacionesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'consulta-publicaciones',
    component: ConsultaPublicacionesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'captura-actividades',
    component: CapturaActividadesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'consulta-actividades',
    component: ConsultaActividadesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'captura-proyectos',
    component: CapturaProyectosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'consulta-proyectos',
    component: ConsultaProyectosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'consulta-entes',
    component: ConsultaEntesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'captura-entes',
    component: CapturaEntesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'captura-usuarios',
    component: CapturaUsuariosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'consulta-usuarios',
    component: ConsultaUsuariosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),DxRadioGroupModule, DxDataGridModule, DxFormModule,DxPopupModule,DxButtonModule,DxLoadPanelModule,DxTextAreaModule],
  providers: [AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttperrorInterceptorService, multi: true }],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    ConsultaUsuariosComponent,
    CapturaUsuariosComponent,
    CapturaEntesComponent,
    ConsultaEntesComponent,
    ConsultaProyectosComponent,
    CapturaProyectosComponent,
    ConsultaActividadesComponent,
    CapturaActividadesComponent,
    ConsultaPublicacionesComponent,
    CapturaPublicacionesComponent,
    
  ]
})
export class AppRoutingModule { }
