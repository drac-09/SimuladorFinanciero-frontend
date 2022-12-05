import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
                                       // Fromularios Reactivos

@Component({
  selector: 'app-flujoefectivo',
  templateUrl: './flujoefectivo.component.html',
  styleUrls: ['./flujoefectivo.component.css']
})
export class FlujoefectivoComponent implements OnInit {
  siguiente=false                                                 // habilitar boton siguiente
  depreciacion:number= 0                                          // guarda valor del calculo de la depreciacion
  mostrarDepreciacion:any                                         // servira para mostrar la depreciacion en el HTML
  flujo:any=[]                                                    // Arreglo de los flunos netos de efectivo

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    inversion: new FormControl('',[Validators.required]),
    ingresos: new FormControl('',[Validators.required]),
    costo: new FormControl('',[Validators.required]),
    anios: new FormControl('',[Validators.required]),
    valorsalvamento: new FormControl('',[Validators.required]),
    impuestos: new FormControl('',[Validators.required]),
    tmar: new FormControl('',[Validators.required]),              // Tasa mminima aceptable de rendimiento
  });


  constructor(
    private router: Router,) {

      if (localStorage.getItem('fe_datos') !== null){
        let form = JSON.parse(String(localStorage.getItem('fe_datos')));
        this.formularioDatos.get('inversion')?.setValue(form.inversion)
        this.formularioDatos.get('ingresos')?.setValue(form.ingresos)
        this.formularioDatos.get('costo')?.setValue(form.costo)
        this.formularioDatos.get('anios')?.setValue(form.anios)
        this.formularioDatos.get('valorsalvamento')?.setValue(form.valorsalvamento)
        this.formularioDatos.get('impuestos')?.setValue(form.impuestos)
        this.formularioDatos.get('tmar')?.setValue(form.tmar)
        this.siguiente = true

        this.depreciacion =  JSON.parse(String(localStorage.getItem('fe_depreciacion')))
        this.mostrarDepreciacion =  JSON.parse(String(localStorage.getItem('fe_depreciacion')))
        let fneLS = localStorage.getItem('fe_flujos')
        this.flujo = JSON.parse(String(fneLS))
      }

      if (localStorage.getItem('fe_flujos') == null){
        // console.log("llenar con local")
        this.formularioDatos.get('inversion')?.setValue(12000000)
        this.formularioDatos.get('ingresos')?.setValue(24000000)
        this.formularioDatos.get('costo')?.setValue(18000000)
        this.formularioDatos.get('anios')?.setValue(5)
        this.formularioDatos.get('valorsalvamento')?.setValue(2000000)
        this.formularioDatos.get('impuestos')?.setValue(30)
        this.formularioDatos.get('tmar')?.setValue(25)
        this.siguiente = false
      }
  }

  ngOnInit(): void {
  }

  calcular(){
    if (this.formularioDatos.valid == false) {                                              // Verifica el usuarios ingreso todos los datos

      alert('Error, Ingresar todos los datos')                                              // Muestra una alerta

    } else {

      // Calculo de la Depreciacion
      this.flujo=[]                                                                         // Vaciamos/limpiamos el arreglo de flujos
      let inversion = this.formularioDatos.get('inversion')?.value                          // Obtenemos el valor de la inversion
      let valorsalvamento = this.formularioDatos.get('valorsalvamento')?.value              // Obtenemos el valor del valor de salvamento
      let anios = this.formularioDatos.get('anios')?.value                                  // Obtenemos los años
      this.depreciacion = ((inversion - valorsalvamento)/anios)                             // Depreciacion = (inversion - Valor Salvamento)/años
      this.mostrarDepreciacion = this.depreciacion.toFixed(2)

      // Calculamos en Año=0
      this.flujo[0]={
        "anio":0,
        "fne":-(this.formularioDatos.get('inversion')?.value).toFixed(2)
      }

      // Obtenemos los sifuientes datos del formulario
      let F_INGRESOS = this.formularioDatos.get('ingresos')?.value                          // Ingresos
      let F_COSTOS = this.formularioDatos.get('costo')?.value                               // Costos
      let F_ISV = this.formularioDatos.get('impuestos')?.value                              // Impuesto
      let F_VS = this.formularioDatos.get('valorsalvamento')?.value                         // Valor   de salvamento

      // Con los datos obtenidos calculamos
      let f_uai = (F_INGRESOS - F_COSTOS - this.depreciacion)                               // Utilidad antes del Impuesto
      let f_isv = f_uai*(F_ISV/100)                                                         // Impuesto
      let f_udi = (f_uai - f_isv)                                                           // Utilidad despues del impuesto
      let f_fne = f_udi + this.depreciacion                                                 // Flujo neto de efectivo


      let a = this.formularioDatos.get('anios')?.value                                      // Obtenemos los años del formulario

      // Ingresamos los datos al arreglo "flujo"
      for (let i = 1; i <= a; i++) {
        this.flujo[i]={
          "anio":i,
          "ingresos": F_INGRESOS.toFixed(2),
          "costosTotales": F_COSTOS.toFixed(2),
          "depreciacion": this.depreciacion.toFixed(2),
          "uai": f_uai.toFixed(2),
          "impuestos":f_isv.toFixed(2),
          "udi": f_udi.toFixed(2),
          "fne": f_fne.toFixed(2)
        }
      }

      // Calculando el ultimo año
      this.flujo[(a)]={
        "anio":(a),
        "ingresos": F_INGRESOS.toFixed(2),
        "costosTotales": F_COSTOS.toFixed(2),
        "depreciacion": this.depreciacion.toFixed(2),
        "uai": f_uai.toFixed(2),
        "impuestos":f_isv.toFixed(2),
        "udi": f_udi.toFixed(2),
        "fne": (f_fne + F_VS).toFixed(2)
      }

      // Hacemos uns copia de los datos en el localStorange
      localStorage.setItem("fe_datos",JSON.stringify(this.formularioDatos.value))           // Datos ingresados por el usuario
      localStorage.setItem("fe_flujos",JSON.stringify(this.flujo))                          // Flujos de efectivo
      localStorage.setItem("fe_depreciacion", JSON.stringify(this.depreciacion))            // La depreciacion
      this.siguiente=true
    }
}

  // }

  limpiar(){
    this.formularioDatos.reset()
    this.flujo=[]
  }

  cancelar(){
    localStorage.removeItem("fe_datos");
    localStorage.removeItem("fe_flujos");
    localStorage.removeItem("fe_depreciacion");
  }

}
