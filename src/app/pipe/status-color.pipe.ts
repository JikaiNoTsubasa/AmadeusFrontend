import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true
})
export class StatusColorPipe implements PipeTransform {

  transform(value: string): string {
    let color: string;

    switch (value.toLowerCase()){
      case 'created': color = 'chip-created'; break;
      case 'ongoing': color = 'chip-ongoing'; break;
      case 'closed': color = 'chip-closed'; break;
      case 'archived': color = 'chip-archived'; break;
      default : color = 'chip-basic';break;
    }
    return 'chip '+ color;
  }

}
