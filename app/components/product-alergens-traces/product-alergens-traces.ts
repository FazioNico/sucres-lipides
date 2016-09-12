import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

/*
  Generated class for the ProductAlergensTraces component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector:     'product-alergens-traces',
  templateUrl:  'build/components/product-alergens-traces/product-alergens-traces.html'
})
export class ProductAlergensTraces implements OnInit{

  arrayData : any[];

  @Input() traceAndAlergensInput: any[];
  @Output() onToggle : EventEmitter<any> = new EventEmitter();

  constructor() {
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
    //console.log(this.arrayData
  }
  onClickToggle(e){
     this.onToggle.emit(e)
  }
  ngOnInit(){
    this.loadData();
  }
}
