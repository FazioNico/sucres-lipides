/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Component } from '@angular/core';

/*
  Generated class for the ProductRelated component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-related',
  templateUrl: 'product-related.html'
})
export class ProductRelatedComponent {

  text: string;

  constructor() {
    //console.log('Hello ProductRelated Component');
    this.text = 'Hello World';
  }

}
