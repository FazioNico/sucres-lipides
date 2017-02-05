/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the ProductNotfound component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-notfound',
  templateUrl: 'product-notfound.html'
})
export class ProductNotfoundComponent {

  @Input() productBarCodeInput: any[];
  @Output() clickBack: EventEmitter<any> = new EventEmitter();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter();

  constructor() {
    //console.log('Hello ProductNotfound Component');
  }

  onClickAdd(){
     this.clickAdd.emit({})
  }

  onClickBack(){
     this.clickBack.emit({})
  }

}
