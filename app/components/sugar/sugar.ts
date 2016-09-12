import { Component, Input } from '@angular/core';
import { SugarPipe } from '../../pipes/SugarPipe';

/*
  Generated class for the Sugar component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'sugar',
  templateUrl: 'build/components/sugar/sugar.html',
  pipes: [SugarPipe]
})
export class Sugar {

  sugarWidth:number;

  @Input() dataInput: number;

  constructor(
  ) {
    this.sugarWidth = 13.5
  }

  getWidth(sugarData){
    return Math.round((sugarData/this.sugarWidth)).toString() + 'rem'
  }
}
