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
  siguiente=false
  van:number=0
  depreciacion:number= 0
  resumenFN:any={}
  flujo:any=[]

  formularioDatos = new FormGroup({
    inversion: new FormControl('',[Validators.required]),
    ingresos: new FormControl('',[Validators.required]),
    costo: new FormControl('',[Validators.required]),
    anios: new FormControl('',[Validators.required]),
    valorsalvamento: new FormControl('',[Validators.required]),
    impuestos: new FormControl('',[Validators.required]),
    tmar: new FormControl('',[Validators.required]),

    // depreciacion: new FormControl(this.dep)
  });
  

  constructor(
    private router: Router,
  ) {
    if (localStorage.getItem('fne') !== null) {
      this.flujo = JSON.parse(String(localStorage.getItem('fne')));
      this.siguiente = true
    } 
    // console.log(localStorage.getItem('fne'))
    this.formularioDatos.get('inversion')?.setValue(12000000)
    this.formularioDatos.get('ingresos')?.setValue(24000000)
    this.formularioDatos.get('costo')?.setValue(18000000)
    this.formularioDatos.get('anios')?.setValue(5)
    this.formularioDatos.get('valorsalvamento')?.setValue(2000000)
    this.formularioDatos.get('impuestos')?.setValue(30)
    this.formularioDatos.get('tmar')?.setValue(25)
  }

  ngOnInit(): void {
  }

  calcular(){
    if (this.formularioDatos.valid == false) {

      alert('Error, Ingresar todos los datos')

    } else {

      // Calculo de la Depreciacion
      this.flujo=[]                                                                         // Vaciamos/limpiamos el arreglo de flujos
      let inversion = this.formularioDatos.get('inversion')?.value                          // Obtenemos el valor de la inversion
      let valorsalvamento = this.formularioDatos.get('valorsalvamento')?.value              // Obtenemos el valor del valor de salvamento
      let anios = this.formularioDatos.get('anios')?.value                                  // Obtenemos los años
      this.depreciacion = (inversion - valorsalvamento)/anios                               // Depreciacion = (inversion - Valor Salvamento)/años


      // Calculamos en Año=0
      this.flujo[0]={
        "anio":0,
        "fne":-(this.formularioDatos.get('inversion')?.value)
      }

      // Obtenemos los sifuientes datos del formulario
      let F_INGRESOS = this.formularioDatos.get('ingresos')?.value                          // Ingresos                          
      let F_COSTOS = this.formularioDatos.get('costo')?.value                               // Costos
      let F_ISV = this.formularioDatos.get('impuestos')?.value                              // Impuesto
      let F_VS = this.formularioDatos.get('valorsalvamento')?.value                         // Valor de salvamento
      
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
          "ingresos": F_INGRESOS,
          "costosTotales": F_COSTOS,
          "depreciacion": this.depreciacion,
          "uai": f_uai,
          "impuestos":f_isv,
          "udi": f_udi,
          "fne": f_fne
        }
      }

      // Calculando el ultimo año
      this.flujo[(a)]={
        "anio":(a),
        "ingresos": F_INGRESOS,
        "costosTotales": F_COSTOS,
        "depreciacion": this.depreciacion,
        "uai": f_uai,
        "impuestos":f_isv,
        "udi": f_udi,
        "fne": f_fne + F_VS
      }

      localStorage.setItem("fne",JSON.stringify(this.flujo))
      this.siguiente=true
    }
}

  // }

  limpiar(){
    this.formularioDatos.reset()
    this.flujo=[]
  }

  cancelar(){
    localStorage.clear();
  }

}
