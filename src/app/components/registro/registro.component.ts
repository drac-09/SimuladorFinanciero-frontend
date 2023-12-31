import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { iniciarSesion } from 'src/app/state/usuario.actions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    contrasenia: new FormControl('', [Validators.required]),
  });

  constructor(
    private autenticacion: AutenticacionService,
    private route: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  registro() {
    this.autenticacion.registro(this.formularioDatos.value)
      .subscribe(
        res => {
          // localStorage.setItem('token', res.token)
          // localStorage.setItem('id', res.id)
          this.store.dispatch(iniciarSesion({ datos: res }))
          this.route.navigate(['./escenarios'])
        },
        error => {
          console.log(error)
        }
      )
  }

}
