import { Pipe, PipeTransform } from '@angular/core';
import {ITour} from '../../models/tour/tour';

@Pipe({
  standalone: true,
  name: 'searchTour'
})
export class SearchTourPipe implements PipeTransform {

  transform(value: any [], searchValue: string, prop: string): any []  {
    if (!searchValue) {
      return  value;
    }

    if(Array.isArray(value)) {
      const regExp = new RegExp(searchValue, 'i');
      return value.filter((t) => {
        if (t[prop] && typeof t[prop] === 'string') {
          return regExp.test(t[prop]);
        } else{
          return false;
        }
      })
    }else{
      console.log(`${value} is not an array`);
      return [];
    }
  }

}
