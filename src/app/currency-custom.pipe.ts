import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCustom'
})
export class CurrencyCustomPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let currencySymbol = args[0].slice(args[0].indexOf('(')+1, args[0].indexOf(')'));
    //console.log(`${currencySymbol}${value}`);
    return `${currencySymbol}${value}`;
  }

}
