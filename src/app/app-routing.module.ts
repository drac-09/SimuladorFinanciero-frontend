import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionGuard} from './autenticacion.guard'

// Componentes principales
import { HomeComponent } from './components/home/home.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

//Componentes de usuario
import { IniciarsesionComponent } from './components/iniciarsesion/iniciarsesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EscenariosComponent } from './components/escenarios/escenarios.component';


// Componentes Simulador
import { FlujoefectivoComponent } from './components/simulador/flujoefectivo/flujoefectivo.component';
import { CostobeneficioComponent } from './components/simulador/costobeneficio/costobeneficio.component';
import { PeriodorecuperacionComponent } from './components/simulador/periodorecuperacion/periodorecuperacion.component';
import { PagoprestamoComponent } from './components/simulador/pagoprestamo/pagoprestamo.component';


// Rutas de Nevegacion
const routes: Routes = [
  // MENU PRINCIPAL
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'documentacion',
    component: DocumentacionComponent
  },
  {
    path: 'acercade',
    component: AcercadeComponent
  },

  // SIMULADOR
  {
    path: 'flujo-efectivo',
    component: FlujoefectivoComponent
  },
  {
    path: 'costo-beneficio',
    component: CostobeneficioComponent
  },
  {
    path: 'periodo-recuperacion',
    component: PeriodorecuperacionComponent
  },
  {
    path: 'pago-prestamo',
    component: PagoprestamoComponent
  },

  // USUARIOS
  {
    path: 'login',
    component: IniciarsesionComponent
  },
  {
    path: 'registro',
    component: RegistroComponent },
  {
    path: 'escenarios',
    component: EscenariosComponent,
    canActivate: [AutenticacionGuard]
  },


  // POR DEFECTO
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' },

  {
    path: '**',
    component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
