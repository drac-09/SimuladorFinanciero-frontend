import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';                                       // Fromularios Reactivos
import { fork } from 'child_process';
import { Console } from 'console';
import { SSL_OP_NO_QUERY_MTU } from 'constants';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-costobeneficio',
  templateUrl: './costobeneficio.component.html',
  styleUrls: ['./costobeneficio.component.css']
})
export class CostobeneficioComponent implements OnInit {
  siguiente=false
  aprobado=false
  rechazado=false

  inversion=0
  flujo:any=[]

  formularioDatos = new FormGroup({
    ccpp: new FormControl('',[Validators.required]),
    vpi: new FormControl('',),
    vpe: new FormControl('',),
    rcb: new FormControl('',),
  });

  constructor() {
    if (localStorage.getItem('rcb') !== null) {
      let RCB = JSON.parse(String(localStorage.getItem('rcb')));
      this.siguiente = true

      this.formularioDatos.get('ccpp')?.setValue(RCB.ccpp)
      this.formularioDatos.get('vpi')?.setValue(RCB.vpi)
      this.formularioDatos.get('vpe')?.setValue(RCB.vpe)
      this.formularioDatos.get('rcb')?.setValue(RCB.rcb)

      if (this.formularioDatos.get('rcb')?.value >= 1) {
        this.aprobado=true
        this.rechazado=false
      }
      if (this.formularioDatos.get('rcb')?.value < 1) {
        this.aprobado=false
        this.rechazado=true
      }
    } 

    let flujoResumen:any = JSON.parse(String(localStorage.getItem('fne')));
    this.inversion = -(flujoResumen[0].fne)

    this.formularioDatos.get('ccpp')?.setValue(10)
    this.formularioDatos.get('vpe')?.setValue(this.inversion)

    if (localStorage.getItem('fne') !== null) {
        for (let f = 0; f < flujoResumen.length; f++) {
            const element = flujoResumen[f];
            this.flujo[f]={
              "anio":element.anio,
              "fne": element.fne
            }
        }
      }
      // console.log(JSON.parse(String(this.flujo))  )
      // console.log(JSON.parse(String(flujoResumen))  )

      
  }

  ngOnInit(): void {
  }

  calcular(){
    if (this.formularioDatos.valid == false) {

        alert('Error, Ingrese el Costo capital promedio ponderado o Tasa de Descuento')

    } else {
      

        // VPI = inversion - Flujo1 + Flujo2 + Flujo3 + .... FlujoN
        // Flujos =  (flujo neto de efectivo) / [(1 + ccpp)^Periodo]
        // obs:
        // CCPP ó Tasa de descuento
        // Perido ó Año


        let flujo                                                   // Almacenara cada flujo de cada periodo (año)
        let flujos:number=0                                         // Almacenara la sumatoria de los flujos
        let td = (this.formularioDatos.get('ccpp')?.value/100)      // Tasa de descuento
        
        // Suma de Periodos
        for (let f = 1; f < this.flujo.length; f++) {               // Recorremos el arreglo
          const element = this.flujo[f];                            // Obtenemos 
          let fne = element.fne                                     // Obtenemos el flujo neto de efectivo de cada periodo
          let periodo = element.anio                                // Obtenermos el numero de año de cada periodo
          
          flujo = fne/(Math.pow(1 + td,periodo))                    // Calculamos el flujo
          flujos += flujo                                           // Sumamos los flujos
        }


        let VPI = this.inversion + flujos
        let VPE = this.formularioDatos.get("vpe")?.value
        this.formularioDatos.get("vpi")?.setValue(VPI.toFixed(2))


        let RCB = VPI / VPE
        this.formularioDatos.get("rcb")?.setValue(RCB.toFixed(2))  


        // Mensaje
        if (this.formularioDatos.get('rcb')?.value >= 1) {
          this.aprobado=true
          this.rechazado=false
        }
        if (this.formularioDatos.get('rcb')?.value < 1) {
          this.aprobado=false
          this.rechazado=true
        }

        this.siguiente=true
        localStorage.setItem("rcb",JSON.stringify(this.formularioDatos.value))
    }
  }



  limpiar(){
    this.formularioDatos.get('ccpp')?.setValue('')
  }

  cancelar(){
    localStorage.clear()
  }

}
