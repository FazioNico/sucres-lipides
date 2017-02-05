/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Component, Input, EventEmitter, Output } from '@angular/core';

/*
  Generated class for the ProductIngredient component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-ingredient',
  templateUrl: 'product-ingredient.html'
})
export class ProductIngredientComponent {

  @Input() ingredientsInput: any[];
  @Output() onToggle: EventEmitter<any> = new EventEmitter();

  constructor() {
    //console.log('Hello ProductIngredient Component');
  }

  onClickToggle(e){
     this.onToggle.emit(e)
  }

}
