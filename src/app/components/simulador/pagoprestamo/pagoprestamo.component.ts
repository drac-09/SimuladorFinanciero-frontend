import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-pagoprestamo',
  templateUrl: './pagoprestamo.component.html',
  styleUrls: ['./pagoprestamo.component.css']
})
export class PagoprestamoComponent implements OnInit {

  tabla:any=[]                                                    // Guardaremos la tabla con los datos obtenidos
  datos:any={}                                                   // Guardaremos la tabla con los datos obtenidos

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    credito: new FormControl('',[Validators.required]),
    tasa: new FormControl('',[Validators.required]),
    plazo: new FormControl('',[Validators.required]),
    cuota: new FormControl(''),
  });

  constructor(
    public autenticacion: AutenticacionService,
    private route: Router,
  ) {
    if (localStorage.getItem('pp_datos') !== null){
      let dat = JSON.parse(String(localStorage.getItem('pp_datos')));
      this.formularioDatos.get('credito')?.setValue(dat.credito)
      this.formularioDatos.get('tasa')?.setValue(dat.tasa)
      this.formularioDatos.get('plazo')?.setValue(dat.plazo)
      this.formularioDatos.get('cuota')?.setValue(dat.cuota)

      let tb = JSON.parse(String(localStorage.getItem('pp_tabla')));
      this.tabla = tb
    }
  }

  ngOnInit(): void {
  }

  calcular(){

    if (this.formularioDatos.valid == false) {

      alert('Error, Ingresar todos los datos')

    } else {

      // Calcular Cuota
      let credito = this.formularioDatos.get('credito')?.value
      let tasa = (this.formularioDatos.get('tasa')?.value / 100)
      let plazo = this.formularioDatos.get('plazo')?.value

      //Calculamos la Cuota
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

      localStorage.setItem("pp_tabla",JSON.stringify(this.tabla))
      localStorage.setItem("pp_datos",JSON.stringify(this.formularioDatos.value))
      // console.log(this.tabla)

      }
    }
  }



  limpiar(){
    this.formularioDatos.get('credito')?.reset()
    this.formularioDatos.get('tasa')?.reset()
    this.formularioDatos.get('plazo')?.reset()
  }

  guardar(){
    let id = localStorage.getItem("id")
    this.datos = {
      "nombre": JSON.parse(String(localStorage.getItem("nombre"))),
      "fe_datos": JSON.parse(String(localStorage.getItem("fe_datos"))),
      "fe_flujos":     JSON.parse(String(localStorage.getItem("fe_flujos"))),
      "fe_depreciacion":     JSON.parse(String(localStorage.getItem("fe_depreciacion"))),
      "rcb_datos":     JSON.parse(String(localStorage.getItem("rcb_datos"))),
      "pr_flujo":     JSON.parse(String(localStorage.getItem("pr_flujo"))),
      "pr_acumulado":     JSON.parse(String(localStorage.getItem("pr_acumulado"))),
      "pr_Recuperacion":     JSON.parse(String(localStorage.getItem("pr_Recuperacion"))),
      "pp_tabla":     JSON.parse(String(localStorage.getItem("pp_tabla"))),
      "pp_datos":     JSON.parse(String(localStorage.getItem("pp_datos"))),
    }

    // console.log(this.datos)
    this.autenticacion.guardar(id, this.datos)
      .subscribe(
        res => {
          this.route.navigate(['./escenarios'])
          localStorage.removeItem("nombre");
        },
        error => {
          console.log(error.error)
        }

      )


  }

  salir(){
    localStorage.removeItem("fe_datos");
    localStorage.removeItem("fe_flujos");
    localStorage.removeItem("fe_depreciacion");
    localStorage.removeItem("rcb_datos");
    localStorage.removeItem("pr_flujo");
    localStorage.removeItem("pr_acumulado");
    localStorage.removeItem("pr_Recuperacion");
    localStorage.removeItem("pp_tabla");
    localStorage.removeItem("pp_datos");
  }

}
