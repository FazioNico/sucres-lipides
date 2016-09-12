import { Component, Input, Output, EventEmitter} from '@angular/core';
import {NavController} from 'ionic-angular';

/*
  Generated class for the SearchResult component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'search-result',
  templateUrl: 'build/components/search-result/search-result.html',
  styles: [`
      .img_thumb {
        background-size: contain;
        background-position: center center;
        height: 80px;
        width: 80px;
        border-radius: 80px;
      }
    `]
})
export class SearchResult {

  @Input() dataInput : any;
  @Output() goProduct: EventEmitter<any> = new EventEmitter();

  constructor(public nav: NavController) {
    this.dataInput  = 'default'
  }

  onGoProduct(event,id){
       this.goProduct.emit({ event:event, id: id })
  }
}
