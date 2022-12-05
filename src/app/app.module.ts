import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';                // Formularios reactivos
import { AutenticacionGuard} from './autenticacion.guard'

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { MenuComponent } from './components/menu/menu.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { FlujoefectivoComponent } from './components/simulador/flujoefectivo/flujoefectivo.component';
import { CostobeneficioComponent } from './components/simulador/costobeneficio/costobeneficio.component';
import { PeriodorecuperacionComponent } from './components/simulador/periodorecuperacion/periodorecuperacion.component';
import { PagoprestamoComponent } from './components/simulador/pagoprestamo/pagoprestamo.component';
import { EscenariosComponent } from './components/escenarios/escenarios.component';
import { IniciarsesionComponent } from './components/iniciarsesion/iniciarsesion.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentacionComponent,
    AcercadeComponent,
    MenuComponent,
    PagenotfoundComponent,
    FlujoefectivoComponent,
    CostobeneficioComponent,
    PeriodorecuperacionComponent,
    PagoprestamoComponent,
    EscenariosComponent,
    IniciarsesionComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AutenticacionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
