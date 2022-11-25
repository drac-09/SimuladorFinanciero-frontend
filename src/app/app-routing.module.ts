import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes principales
import { HomeComponent } from './components/home/home.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { MenuComponent } from './components/menu/menu.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

// Componentes Simulador
import { FlujoefectivoComponent } from './components/simulador/flujoefectivo/flujoefectivo.component'; 
import { CostobeneficioComponent } from './components/simulador/costobeneficio/costobeneficio.component';
import { PeriodorecuperacionComponent } from './components/simulador/periodorecuperacion/periodorecuperacion.component';
import { PagoprestamoComponent } from './components/simulador/pagoprestamo/pagoprestamo.component';


// Rutas de Nevegacion
const routes: Routes = [
  {path: ' ', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'documentacion', component: DocumentacionComponent },
  {path: 'acercade', component: AcercadeComponent },

  {path: 'flujoe-fectivo', component: FlujoefectivoComponent },
  {path: 'costo-beneficio', component: CostobeneficioComponent },
  {path: 'periodo-recuperacion', component: PeriodorecuperacionComponent },
  {path: 'pago-prestamo', component: PagoprestamoComponent },
  
  {path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
