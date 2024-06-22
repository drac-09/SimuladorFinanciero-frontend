import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputPorcentaje]'
})
export class InputPorcentajeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    let input = <HTMLInputElement>event.target;
    let value = input.value;

    // Eliminar caracteres no numéricos excepto el punto
    let removeNonNumeric = value.replace(/[^0-9.]/g, '');
    // Reemplazar múltiples puntos con un solo punto
    let removeExtraDots = removeNonNumeric.replace(/(\..*)\./g, '$1');

    // Verificar formato decimal válido
    let validDecimalFormat = /^(\d+)?(\.\d{0,2})?$/.test(removeExtraDots);

    if (validDecimalFormat) {
      input.value = removeExtraDots;
    } else {
      // Revertir al último valor válido si el formato es inválido
      input.value = input.value.substring(0, input.value.length - 1);
    }
  }

}
