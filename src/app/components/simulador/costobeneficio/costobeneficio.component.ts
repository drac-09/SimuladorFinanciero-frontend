import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';                                       // Fromularios Reactivos


@Component({
  selector: 'app-costobeneficio',
  templateUrl: './costobeneficio.component.html',
  styleUrls: ['./costobeneficio.component.css']
})
export class CostobeneficioComponent implements OnInit {
  siguiente=false                                                               // habilitar boton siguiente
  aprobado=false                                                                // Estado del mensaje APROBADO
  rechazado=false                                                               // Estado del mensaje RECHAZADO

  inversion=0                                                                   // Alamacenamos la inversion
  flujo:any=[]                                                                  // Alamcenamos los flunos de efectivos encontrados en el inciso 1

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    ccpp: new FormControl('',[Validators.required]),
    vpi: new FormControl('',),
    vpe: new FormControl('',),
    rcb: new FormControl('',),
  });

  constructor() {
    // Obtenermos los flujos encontrados en el inciso 1
    let flujoResumen:any = JSON.parse(String(localStorage.getItem('fe_flujos')));

    // Valor del valor presente de ingresos = -(inversion)
    this.formularioDatos.get('vpe')?.setValue(-(flujoResumen[0].fne))

    // ingresamos al arreflo de flujo los flujos ontenidos en el inciso 1
    if (localStorage.getItem('fe_flujos') !== null) {
        for (let f = 0; f < flujoResumen.length; f++) {
            const element = flujoResumen[f];
            this.flujo[f]={
              "anio":element.anio,
              "fne": element.fne
            }
        }
      }

    // Verificamos si hay datos guardados en el localStorange
    if (localStorage.getItem('rcb_datos') !== null) {
      let RCB = JSON.parse(String(localStorage.getItem('rcb_datos')));
      this.siguiente = true

      // Obtenemos los datos del formulario y los cargamos
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
        localStorage.removeItem("rcb_datos")
        localStorage.setItem("rcb_datos",JSON.stringify(this.formularioDatos.value))
    }
  }



  limpiar(){
    this.formularioDatos.get('ccpp')?.setValue('')
  }

  cancelar(){
    localStorage.removeItem("fe_datos");
    localStorage.removeItem("fe_flujos");
    localStorage.removeItem("fe_depreciacion");
    localStorage.removeItem("rcb_datos")
  }

}
