/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
*/

import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'sugar'
})
@Injectable()
export class SugarPipe {

  transform(value: any): any {

    let maxGR = 4;
    let perCent = 100;
    let sugarTmp;
    let sugarArray = [];

    sugarTmp = (value/maxGR)*perCent;
    // creating data section
    for (var i = 0; i < value/maxGR; i++) {
      if(sugarTmp >= perCent){
        sugarArray.push(perCent)
        sugarTmp = sugarTmp - perCent
      }
      else {
        if(sugarTmp >= 1){
          sugarArray.push(sugarTmp)
        }
      }
    }
    //console.log(sugarArray)
    return sugarArray
  }
}
