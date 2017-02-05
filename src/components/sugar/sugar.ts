import { Component, Input } from '@angular/core';

/*
  Generated class for the Sugar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'sugar',
  templateUrl: 'sugar.html'
})
export class SugarComponent {

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
