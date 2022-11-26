import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';                                       // Fromularios Reactivos


@Component({
  selector: 'app-costobeneficio',
  templateUrl: './costobeneficio.component.html',
  styleUrls: ['./costobeneficio.component.css']
})
export class CostobeneficioComponent implements OnInit {

  formularioDatos = new FormGroup({
    wacc: new FormControl('',[Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  calcular(){

  }

  limpiar(){
    this.formularioDatos.reset()
  }


}
