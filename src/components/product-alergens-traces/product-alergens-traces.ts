/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

/*
  Generated class for the ProductAlergensTraces component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-alergens-traces',
  templateUrl: 'product-alergens-traces.html'
})
export class ProductAlergensTracesComponent implements OnInit{

  arrayData : any[];

  @Input() traceAndAlergensInput: any[];
  @Output() onToggle : EventEmitter<any> = new EventEmitter();

  constructor() {
    //console.log('Hello ProductAlergensTraces Component');
    this.arrayData = [];
  }
  loadData(){
    this.arrayData = [];
    let data = this.traceAndAlergensInput
    data.map(
      item => {
        if(item.length > 0){
          this.arrayData.push(item)
        }
      }
    )
    //console.log(this.arrayData)
  }

  onClickToggle(e){
     this.onToggle.emit(e)
  }
  ngOnInit(){
    this.loadData();
  }
}
