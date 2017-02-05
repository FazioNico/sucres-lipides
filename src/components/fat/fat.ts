/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Component, Input } from '@angular/core';

/*
  Generated class for the Fat component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'fat',
  templateUrl: 'fat.html'
})
export class FatComponent {

  @Input() dataInput: number;

  constructor() {
    //console.log('Hello Fat Component');
  }

  setLiquid(value){
    const perCent:number  = 100
    const maxGR:number 	  = 70
    return Math.round(perCent - ( (value/maxGR) * perCent) ).toString() + '%'
  }

}
