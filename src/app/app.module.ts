import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';                // Formularios reactivos
import { AutenticacionGuard } from './autenticacion.guard'

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


// import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCERS } from './state/app.state';
import { localStorageSync } from 'ngrx-store-localstorage';

import { StoreModule, ActionReducer, MetaReducer, Action } from '@ngrx/store';

// Función para imprimir el estado
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    const nextState = reducer(state, action);
    console.log('Estado después de la acción', action, nextState);
    return nextState;
  };
}

// Configuración para almacenar el estado en localStorage
export const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> =>
  localStorageSync({
    keys: ['usuario'], // Ajusta 'tuEstado' según el nombre del segmento de estado que deseas almacenar
    rehydrate: true,
    storage: sessionStorage,
  })(reducer);


// Lista de metaReducers
export const metaReducers: MetaReducer<any, Action>[] = [debug, localStorageSyncReducer];

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
    ReactiveFormsModule,
    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  providers: [
    AutenticacionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
