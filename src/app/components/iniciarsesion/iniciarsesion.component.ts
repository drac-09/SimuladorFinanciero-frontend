import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    correo: new FormControl('',[Validators.required]),
    contrasenia: new FormControl('',[Validators.required]),
  });

  constructor(
    private autenticacion: AutenticacionService,
    private cookieService: CookieService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.autenticacion.login(this.formularioDatos.value)
      .subscribe(
        res => {
          localStorage.setItem('token',res.token)
          localStorage.setItem('id',res.id)
          this.route.navigate(['./escenarios'])
        },
        error => {
          console.log(error.error)
        }

      )
  }


}
