import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HeaderContent } from '../../components/header-content/header-content';
/*
  Generated class for the ProductNotfound component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-notfound',
  templateUrl: 'build/components/product-notfound/product-notfound.html',
  directives: [
      HeaderContent
  ]
})
export class ProductNotfound {

  @Input() productBarCodeInput: any[];
  @Output() clickBack: EventEmitter<any> = new EventEmitter();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  onClickAdd(){
     this.clickAdd.emit({})
  }

  onClickBack(){
     this.clickBack.emit({})
  }
}
