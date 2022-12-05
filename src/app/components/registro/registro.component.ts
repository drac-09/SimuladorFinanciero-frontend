import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    correo: new FormControl('',[Validators.required]),
    contrasenia: new FormControl('',[Validators.required]),
  });

  constructor(
    private autenticacion: AutenticacionService,
    private route: Router,
    ) { }

  ngOnInit(): void {
  }

  registro(){
    this.autenticacion.registro(this.formularioDatos.value)
    .subscribe(
      res => {
        localStorage.setItem('token',res.token)
        localStorage.setItem('id',res.id)
        this.route.navigate(['./escenarios'])
      },
      error => {
        console.log(error)
      }
    )
  }

}
