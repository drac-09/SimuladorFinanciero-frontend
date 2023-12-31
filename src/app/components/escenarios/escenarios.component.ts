import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../services/autenticacion.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { selectorPerfil } from '../../state/usuario.selector';
import { map } from 'rxjs';

@Component({
  selector: 'app-escenarios',
  templateUrl: './escenarios.component.html',
  styleUrls: ['./escenarios.component.css']
})
export class EscenariosComponent implements OnInit {
  nombre: any
  escenarios: any
  titulo: string = ''

  constructor(
    private autenticacion: AutenticacionService,
    private cookieService: CookieService,
    private store: Store<AppState>,
    private route: Router,
  ) {
    const id = this.store.select(selectorPerfil).pipe(
      map(perfil => perfil!.id)
    );
    this.autenticacion.obtener(id)
      .subscribe(
        res => {
          if (res == null) { this.escenarios = []; }           // Si no hay productos, llenar arreglo con vacio
          if (res !== null) { this.escenarios = res }           // Si no hay productos, llenar arreglo con vacio
        },
        error => {
          console.log(error.error)
        }

      )
  }

  ngOnInit(): void {
  }

  seleccionar(esc: any) {
    this.limpiarLS();
    this.nombre = esc.nombre
    localStorage.setItem("nombre", JSON.stringify(esc.nombre));
    localStorage.setItem("fe_datos", JSON.stringify(esc.fe_datos));
    localStorage.setItem("fe_flujos", JSON.stringify(esc.fe_flujos));
    localStorage.setItem("fe_depreciacion", JSON.stringify(esc.fe_depreciacion));
    localStorage.setItem("rcb_datos", JSON.stringify(esc.rcb_datos));
    localStorage.setItem("pr_flujo", JSON.stringify(esc.pr_flujo));
    localStorage.setItem("pr_acumulado", JSON.stringify(esc.pr_acumulado));
    localStorage.setItem("pr_Recuperacion", JSON.stringify(esc.pr_Recuperacion));
    localStorage.setItem("pp_tabla", JSON.stringify(esc.pp_tabla));
    localStorage.setItem("pp_datos", JSON.stringify(esc.pp_datos));
  }

  renombrar() {

  }

  abrir() {
    this.route.navigate(['./flujo-efectivo'])
  }

  eliminar() {

  }

  nuevo() {
    localStorage.clear()
  }

  continuar() {
    // this.limpiarLS();
    localStorage.setItem('nombre', JSON.stringify(this.nombre))
    this.route.navigate(['./flujo-efectivo'])
  }


  cerrar() {
    this.nombre = ''
  }

  limpiarLS() {
    localStorage.removeItem("fe_datos");
    localStorage.removeItem("fe_flujos");
    localStorage.removeItem("fe_depreciacion");
    localStorage.removeItem("rcb_datos");
    localStorage.removeItem("pr_flujo");
    localStorage.removeItem("pr_acumulado");
    localStorage.removeItem("pr_Recuperacion");
    localStorage.removeItem("pp_tabla");
    localStorage.removeItem("pp_datos");
  }
}
