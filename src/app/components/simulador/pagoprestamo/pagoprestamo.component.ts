import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagoprestamo',
  templateUrl: './pagoprestamo.component.html',
  styleUrls: ['./pagoprestamo.component.css']
})
export class PagoprestamoComponent implements OnInit {

  mostrarDepreciacion:any
  tabla:any=[]

  formularioDatos = new FormGroup({
    credito: new FormControl('20000',[Validators.required]),
    tasa: new FormControl('3',[Validators.required]),
    plazo: new FormControl('12',[Validators.required]),
    cuota: new FormControl('',[Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  calcular(){

    // Calcular Cuota
    let credito = this.formularioDatos.get('credito')?.value
    let tasa = (this.formularioDatos.get('tasa')?.value / 100)
    let plazo = this.formularioDatos.get('plazo')?.value
    let cuota = this.formularioDatos.get('cuota')?.value
    // console.log(credito, tasa, plazo)

    let calcular_cuota = (credito / ((1 - Math.pow((1+tasa),(-plazo)) )/tasa))
    this.formularioDatos.get('cuota')?.setValue(calcular_cuota.toFixed(2))


    //Datos de la tabla
    this.tabla[0]={
      "saldo": credito
    }

    for (let t = 1; t <= plazo; t++) {
      let t_interes = this.tabla[t-1].saldo * tasa
      let t_amortizacion = calcular_cuota - t_interes
      let t_saldo = this.tabla[t-1].saldo - t_amortizacion

      this.tabla[t]={
        "periodo": t,
        "cuotas": calcular_cuota.toFixed(2),
        "interes": t_interes.toFixed(2),
        "amortizacion": t_amortizacion.toFixed(2),
        "saldo": t_saldo.toFixed(2)
      }

    console.log(this.tabla)

    }
  }

  limpiar(){
    this.formularioDatos.get('credito')?.reset()
    this.formularioDatos.get('tasa')?.reset()
    this.formularioDatos.get('plazo')?.reset()
  }

  cancelar(){
    localStorage.clear();
  }

}
