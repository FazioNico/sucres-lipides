/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, Input } from '@angular/core';

/*
  Generated class for the ProductHeader component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-header',
  templateUrl: 'product-header.html'
})
export class ProductHeaderComponent {

  @Input() productDataHeaderInput: any[];
  @Input() isClassOpacity: boolean = true;

  constructor() {
    //console.log('Hello ProductHeader Component');
  }

}
