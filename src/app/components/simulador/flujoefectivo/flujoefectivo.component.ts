import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-flujoefectivo',
  templateUrl: './flujoefectivo.component.html',
  styleUrls: ['./flujoefectivo.component.css']
})
export class FlujoefectivoComponent implements OnInit {
  siguiente = false                                                 // habilitar boton siguiente
  depreciacion: number = 0                                          // guarda valor del calculo de la depreciacion
  mostrarDepreciacion: any                                          // servira para mostrar la depreciacion en el HTML
  flujo: any = []                                                   // Arreglo de los flujos netos de efectivo

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    inversion: new FormControl('', [Validators.required]),
    ingresos: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required]),
    anios: new FormControl('', [Validators.required]),
    valorsalvamento: new FormControl('', [Validators.required]),
    impuestos: new FormControl('', [Validators.required]),
    tmar: new FormControl('', [Validators.required]),               // Tasa minima aceptable de rendimiento
  });


  constructor(
    private route: Router) {

    if (localStorage.getItem('fe_datos') !== null) {
      let form = JSON.parse(String(localStorage.getItem('fe_datos')));
      this.formularioDatos.get('inversion')?.setValue(form.inversion)
      this.formularioDatos.get('ingresos')?.setValue(form.ingresos)
      this.formularioDatos.get('costo')?.setValue(form.costo)
      this.formularioDatos.get('anios')?.setValue(form.anios)
      this.formularioDatos.get('valorsalvamento')?.setValue(form.valorsalvamento)
      this.formularioDatos.get('impuestos')?.setValue(form.impuestos)
      this.formularioDatos.get('tmar')?.setValue(form.tmar)
      this.siguiente = true

      this.depreciacion = JSON.parse(String(localStorage.getItem('fe_depreciacion')))
      this.mostrarDepreciacion = JSON.parse(String(localStorage.getItem('fe_depreciacion')))
      let fneLS = localStorage.getItem('fe_flujos')
      this.flujo = JSON.parse(String(fneLS))
    }

  }

  ngOnInit(): void {
  }

  calcular() {
    if (this.formularioDatos.valid == false) {      // Verifica el usuarios ingreso todos los datos
      alert('Error, Ingresar todos los datos')      // Muestra una alerta

    } else {

      // Calculo de la Depreciacion
      this.flujo = []                                                                                     // Vaciamos/limpiamos el arreglo de flujos
      let inversion = this.convertirNumero(this.formularioDatos.get('inversion')?.value)                  // Obtenemos el valor de la inversion
      let valorsalvamento = this.convertirNumero(this.formularioDatos.get('valorsalvamento')?.value)      // Obtenemos el valor del valor de salvamento
      let anios = this.formularioDatos.get('anios')?.value                                                // Obtenemos los años
      this.depreciacion = ((inversion - valorsalvamento) / anios)                                         // Depreciacion = (inversion - Valor Salvamento)/años
      this.mostrarDepreciacion = this.convertirNumero(this.depreciacion.toFixed(2))

      // Calculamos en Año=0
      this.flujo[0] = {
        "anio": 0,
        "fne": -(this.convertirNumero(this.formularioDatos.get('inversion')?.value)).toFixed(2)
      }

      // Obtenemos los sifuientes datos del formulario
      let F_INGRESOS = this.convertirNumero(this.formularioDatos.get('ingresos')?.value)     // Ingresos
      let F_COSTOS = this.convertirNumero(this.formularioDatos.get('costo')?.value)          // Costos
      let F_ISV = this.convertirNumero(this.formularioDatos.get('impuestos')?.value)         // Impuesto
      let F_VS = this.convertirNumero(this.formularioDatos.get('valorsalvamento')?.value)    // Valor   de salvamento

      // Con los datos obtenidos calculamos
      let f_uai = (F_INGRESOS - F_COSTOS - this.depreciacion)  // Utilidad antes del Impuesto
      let f_isv = f_uai * (F_ISV / 100)                        // Impuesto
      let f_udi = (f_uai - f_isv)                              // Utilidad despues del impuesto
      let f_fne = f_udi + this.depreciacion                    // Flujo neto de efectivo


      let a = this.formularioDatos.get('anios')?.value         // Obtenemos los años del formulario

      // Ingresamos los datos al arreglo "flujo"
      for (let i = 1; i <= a; i++) {
        this.flujo[i] = {
          "anio": i,
          "ingresos": F_INGRESOS.toFixed(2),
          "costosTotales": F_COSTOS.toFixed(2),
          "depreciacion": this.depreciacion.toFixed(2),
          "uai": f_uai.toFixed(2),
          "impuestos": f_isv.toFixed(2),
          "udi": f_udi.toFixed(2),
          "fne": f_fne.toFixed(2)
        }
      }

      // Calculando el ultimo año
      this.flujo[(a)] = {
        "anio": (a),
        "ingresos": F_INGRESOS.toFixed(2),
        "costosTotales": F_COSTOS.toFixed(2),
        "depreciacion": this.depreciacion.toFixed(2),
        "uai": f_uai.toFixed(2),
        "impuestos": f_isv.toFixed(2),
        "udi": f_udi.toFixed(2),
        "fne": (f_fne + F_VS).toFixed(2)
      }

      // Hacemos uns copia de los datos en el localStorange
      // this.cancelar();
      localStorage.setItem("fe_datos", JSON.stringify(this.formularioDatos.value))        // Datos ingresados por el usuario
      localStorage.setItem("fe_flujos", JSON.stringify(this.flujo))                       // Flujos de efectivo
      localStorage.setItem("fe_depreciacion", JSON.stringify(this.depreciacion.toFixed(2)))          // La depreciacion
      this.siguiente = true
    }
  }

  // }

  limpiar() {
    this.formularioDatos.reset()
    this.flujo = []
  }

  cancelar() {
    this.route.navigate(['./escenarios'])
    localStorage.clear()
  }

  // formatearConComas(numero: number): string {
  //   return numero.toLocaleString();
  // }

  convertirNumero(texto: string): number {
    let valorSinComas = texto.replace(/,/g, '');    // Eliminar comas (si es que existen)
    let numero = parseFloat(valorSinComas);         // Convertir a número
    return numero;
  }

}
