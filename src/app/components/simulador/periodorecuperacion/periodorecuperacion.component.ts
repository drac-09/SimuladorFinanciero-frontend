import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-periodorecuperacion',
  templateUrl: './periodorecuperacion.component.html',
  styleUrls: ['./periodorecuperacion.component.css']
})
export class PeriodorecuperacionComponent implements OnInit {
  siguiente=false                                                       // habilitar boton siguiente
  aRecuperacion:any = 0                                                 // Almacenaremos el año de recuperacion
  flujo:any=[]                                                          // Almacenar el FNE del LocalStorange
  acumulado:any=[]                                                      // Almacenar el resultado del calculo "acumulado"

  constructor() {
    if (localStorage.getItem('pr_flujo') !== null){
      this.flujo = JSON.parse(String(localStorage.getItem('pr_flujo')));
      this.aRecuperacion = JSON.parse(String(localStorage.getItem('pr_Recuperacion')));
      this.acumulado = JSON.parse(String(localStorage.getItem('pr_acumulado')));
      this.siguiente = true;
    }
  }

  ngOnInit(): void {

  }

  calcular (){
    let flujoResumen:any = JSON.parse(String(localStorage.getItem('fe_flujos')));
    for (let f = 0; f < flujoResumen.length; f++) {
        const element = flujoResumen[f];
        this.flujo[f]={
          "anio":element.anio,
          "fne": element.fne,
        }
    }

    // Calculo "Acumulados" de los Flujos de Efectivo
    this.acumulado[0]='‎';
    this.acumulado[1]=flujoResumen[1].fne
    for (let i = 2; i < this.flujo.length; i++) {
      this.acumulado[i] = (parseInt(this.acumulado[i-1]) + parseInt(this.flujo[i].fne)).toFixed(2)
    }

    // Obteniendo valores para calcular el año donde recupera la inversion.
    let inversion = -flujoResumen[0].fne
    let anterior = 0
    let posterior = 0
    let anio = 0
    for (let a = 0; a < this.acumulado.length; a++) {
      if (this.acumulado[a] < (-flujoResumen[0].fne)){
          anterior = this.acumulado[a]
          posterior = flujoResumen[a+1].fne
          anio = flujoResumen[a].anio
      }
    }

    //Calculo año donde recupera la inversion.
    let recuperado = anio+((inversion-anterior)/posterior)
    this.aRecuperacion = recuperado.toFixed(2)

    this.siguiente=true
    localStorage.setItem("pr_flujo",JSON.stringify(this.flujo))
    localStorage.setItem("pr_acumulado",JSON.stringify(this.acumulado))
    localStorage.setItem("pr_Recuperacion",JSON.stringify(this.aRecuperacion))
  }

  cancelar(){
    localStorage.clear()
  }


}
