import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DocumentacionComponent } from './components/documentacion/documentacion.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { MenuComponent } from './components/menu/menu.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocumentacionComponent,
    AcercadeComponent,
    MenuComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
