import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: string): string {
    let values = value.split(' ');
    let result = '';
    return result;

    for (let v of values) {
      result += this.capitalize(v) + ' ';
    }
  }

  capitalize(value: string){
    return value.substring(0,1).toUpperCase() +
      value.substring(1).toLowerCase();
  }

}
