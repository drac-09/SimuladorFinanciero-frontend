import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { selectorEstado, selectorPerfil } from './state/usuario.selector';
import { cerrarSesion } from './state/usuario.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SimuladorFinanciero-frontend';
  nombrePerfil$ = this.store.select(selectorPerfil).pipe(
    map(perfil => perfil!.usuario)
  );

  inicioSesion$: Observable<boolean> = new Observable()

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.inicioSesion$ = this.store.select(selectorEstado)
  }

  cerrar() {
    this.store.dispatch(cerrarSesion())
  }

}
