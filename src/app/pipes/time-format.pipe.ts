import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;
    return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
  }

}
