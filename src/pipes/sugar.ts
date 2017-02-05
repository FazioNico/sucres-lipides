import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Sugar pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
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
