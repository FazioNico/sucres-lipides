/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the SearchResult component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'search-result',
  templateUrl: 'search-result.html'
})
export class SearchResultComponent {

  @Input() dataInput : any;
  @Output() goProduct: EventEmitter<any> = new EventEmitter();

  constructor() {
    //console.log('Hello SearchResult Component');
    this.dataInput  = 'default'
  }

  onGoProduct(event,product){
       this.goProduct.emit({ event:event, product: product })
  }
}
