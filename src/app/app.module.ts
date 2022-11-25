import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';                // Formularios reactivos


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
    PagoprestamoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
