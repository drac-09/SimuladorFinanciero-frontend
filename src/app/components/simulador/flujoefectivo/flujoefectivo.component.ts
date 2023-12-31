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
  mostrarDepreciacion: any                                         // servira para mostrar la depreciacion en el HTML
  flujo: any = []                                                    // Arreglo de los flunos netos de efectivo

  // Formulario para capturar los datos de los imput
  formularioDatos = new FormGroup({
    inversion: new FormControl('', [Validators.required]),
    ingresos: new FormControl('', [Validators.required]),
    costo: new FormControl('', [Validators.required]),
    anios: new FormControl('', [Validators.required]),
    valorsalvamento: new FormControl('', [Validators.required]),
    impuestos: new FormControl('', [Validators.required]),
    tmar: new FormControl('', [Validators.required]),              // Tasa mminima aceptable de rendimiento
  });


  constructor(
    private route: Router) {

    if (localStorage.getItem('fe_datos') !== null) {
      let form = JSON.parse(String(localStorage.getItem('fe_datos')));
      this.formularioDatos.get('inversion')?.setValue(form[0].inversion)
      this.formularioDatos.get('ingresos')?.setValue(form[0].ingresos)
      this.formularioDatos.get('costo')?.setValue(form[0].costo)
      this.formularioDatos.get('anios')?.setValue(form[0].anios)
      this.formularioDatos.get('valorsalvamento')?.setValue(form[0].valorsalvamento)
      this.formularioDatos.get('impuestos')?.setValue(form[0].impuestos)
      this.formularioDatos.get('tmar')?.setValue(form[0].tmar)
      this.siguiente = true

      this.depreciacion = JSON.parse(String(localStorage.getItem('fe_depreciacion')))
      this.mostrarDepreciacion = JSON.parse(String(localStorage.getItem('fe_depreciacion')))
      let fneLS = localStorage.getItem('fe_flujos')
      this.flujo = JSON.parse(String(fneLS))
    }

    // if (localStorage.getItem('fe_flujos') === null) {
    //   this.formularioDatos.get('inversion')?.setValue(12000000)
    //   this.formularioDatos.get('ingresos')?.setValue(24000000)
    //   this.formularioDatos.get('costo')?.setValue(18000000)
    //   this.formularioDatos.get('anios')?.setValue(5)
    //   this.formularioDatos.get('valorsalvamento')?.setValue(2000000)
    //   this.formularioDatos.get('impuestos')?.setValue(30)
    //   this.formularioDatos.get('tmar')?.setValue(25)
    //   this.siguiente = false
    // }
  }

  ngOnInit(): void {
  }

  calcular() {
    if (this.formularioDatos.valid == false) {                                              // Verifica el usuarios ingreso todos los datos

      alert('Error, Ingresar todos los datos')                                              // Muestra una alerta

    } else {

      // Calculo de la Depreciacion
      this.flujo = []                                                                         // Vaciamos/limpiamos el arreglo de flujos
      let inversion = this.formularioDatos.get('inversion')?.value                          // Obtenemos el valor de la inversion
      let valorsalvamento = this.formularioDatos.get('valorsalvamento')?.value              // Obtenemos el valor del valor de salvamento
      let anios = this.formularioDatos.get('anios')?.value                                  // Obtenemos los años
      this.depreciacion = ((inversion - valorsalvamento) / anios)                             // Depreciacion = (inversion - Valor Salvamento)/años
      this.mostrarDepreciacion = this.depreciacion.toFixed(2)

      // Calculamos en Año=0
      this.flujo[0] = {
        "anio": 0,
        "fne": -(this.formularioDatos.get('inversion')?.value).toFixed(2)
      }

      // Obtenemos los sifuientes datos del formulario
      let F_INGRESOS = this.formularioDatos.get('ingresos')?.value                          // Ingresos
      let F_COSTOS = this.formularioDatos.get('costo')?.value                               // Costos
      let F_ISV = this.formularioDatos.get('impuestos')?.value                              // Impuesto
      let F_VS = this.formularioDatos.get('valorsalvamento')?.value                         // Valor   de salvamento

      // Con los datos obtenidos calculamos
      let f_uai = (F_INGRESOS - F_COSTOS - this.depreciacion)                               // Utilidad antes del Impuesto
      let f_isv = f_uai * (F_ISV / 100)                                                         // Impuesto
      let f_udi = (f_uai - f_isv)                                                           // Utilidad despues del impuesto
      let f_fne = f_udi + this.depreciacion                                                 // Flujo neto de efectivo


      let a = this.formularioDatos.get('anios')?.value                                      // Obtenemos los años del formulario

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
      localStorage.setItem("fe_datos", JSON.stringify(this.formularioDatos.value))           // Datos ingresados por el usuario
      localStorage.setItem("fe_flujos", JSON.stringify(this.flujo))                          // Flujos de efectivo
      localStorage.setItem("fe_depreciacion", JSON.stringify(this.depreciacion))            // La depreciacion
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
    localStorage.removeItem("nombre");
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

  // formatoConComasAutomaticas(input: HTMLInputElement) {
  //   var valor = input.value; // Obtén el valor actual del input
  //   valor = valor.replace(/[^\d]/g, ''); // Elimina cualquier caracter que no sea un número
  //   var partes = valor.split(','); // Divide la cadena en parte entera y decimal (si hay)
  //   partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Formatea la parte entera con comas
  //   input.value = partes.join(','); // Vuelve a unir las partes y asigna al input
  // }

}
