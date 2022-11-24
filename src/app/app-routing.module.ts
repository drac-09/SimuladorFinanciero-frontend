import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { MenuComponent } from './components/menu/menu.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


// Rutas de Nevegacion
const routes: Routes = [
  {path: ' ', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'documentacion', component: DocumentacionComponent },
  {path: 'acercade', component: AcercadeComponent },
  {path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
