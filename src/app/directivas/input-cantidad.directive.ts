import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputCantidad]'
})
export class InputCantidadDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    let input = <HTMLInputElement>event.target;
    let value = input.value;

    // Replace non-numeric characters except dot
    let removeNonNumeric = value.replace(/[^0-9.]/g, '');
    // Replace multiple dots with single dot
    let removeExtraDots = removeNonNumeric.replace(/(\..*)\./g, '$1');
    // Format number with commas
    let formattedNumber = this.formatNumberWithCommas(removeExtraDots);

    // Update input value with formatted number
    input.value = formattedNumber;

    // Restrict to two decimal places
    this.restrictDecimalPlaces(input);
  }

  private formatNumberWithCommas(numberStr: string): string {
    return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  private restrictDecimalPlaces(input: HTMLInputElement): void {
    let value = input.value;
    let decimalIndex = value.indexOf('.');

    if (decimalIndex !== -1) {
      let decimalPart = value.substring(decimalIndex + 1);
      if (decimalPart.length > 2) {
        input.value = value.substring(0, decimalIndex + 3); // Limit to two decimal places
      }
    }
  }

}
