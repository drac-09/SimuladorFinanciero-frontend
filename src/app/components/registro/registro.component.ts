import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { CookieService } from 'ngx-cookie-service';
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
  confirmar: boolean = false

  formularioDatos = new FormGroup({
    // usuario: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    contrasenia: new FormControl('', [Validators.required]),
    confirmarcontrasenia: new FormControl('', [Validators.required]),
  });

  constructor(
    private autenticacion: AutenticacionService,
    private cookieService: CookieService,
    private route: Router,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
  }

  registro() {
    const contrasenia1 = this.formularioDatos.get('contrasenia')?.value;
    const contrasenia2 = this.formularioDatos.get('confirmarcontrasenia')?.value;

    if (contrasenia1 === contrasenia2) {
      this.autenticacion.registro(this.formularioDatos.value)
        .subscribe(
          res => {
            // localStorage.setItem('token', res.token)
            // localStorage.setItem('id', res.id)
            this.cookieService.set('token', res.token);
            this.store.dispatch(iniciarSesion({ datos: res }))
            this.route.navigate(['./escenarios'])
          },
          error => {
            console.log(error)
          }
        )
    } else {
      this.confirmar = true
    }

  }

}
