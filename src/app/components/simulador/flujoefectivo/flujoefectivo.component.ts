import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';                                       // Fromularios Reactivos

@Component({
  selector: 'app-flujoefectivo',
  templateUrl: './flujoefectivo.component.html',
  styleUrls: ['./flujoefectivo.component.css']
})
export class FlujoefectivoComponent implements OnInit {

  datos = new FormGroup({
    inversion: new FormControl(''),
    ingresos: new FormControl(''),
    costoProduccion: new FormControl(''),
    anios: new FormControl(''),
    valorSalvamento: new FormControl(''),
    impuestos: new FormControl(''),
    TMAR: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }

  calcular(){
    console.log(this.datos.value)
  }

  limpiar(){
    this.datos.reset()
  }

}
