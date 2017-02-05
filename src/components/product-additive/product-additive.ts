/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Component, Input, OnInit, EventEmitter, Output  } from '@angular/core';
//import { StoreService } from "../../providers/store/store";

/*
  Generated class for the ProductAdditive component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-additive',
  templateUrl: 'product-additive.html'
})
export class ProductAdditiveComponent implements OnInit{

  additiveData: any[];
  total:any= '0';

  @Input() additiveInput: any[];
  @Output() onToggle: EventEmitter<any> = new EventEmitter();
  @Output() onModalOpen: EventEmitter<any> = new EventEmitter();

  constructor() {
    //console.log('Hello ProductAdditive Component');
    this.additiveData = [];
  }

  getAdditiveAuthLevel(level:any=1){
      let color:string;
      switch (+level) {
        case 0:
          color= '#e57373'; // red
          break;
        case 1:
          color= '#ffb74d'; // orange
          break;
        case 2:
          color= 'yellow'; // yellow
          break;
        case 3:
          color= 'green'; // green
          break;
        default:
      }
      return  color;
  }

  getAdditiveTextLevel(level:any=1){
    let txt:string;
    switch (+level) {
      case 0:
        txt= 'à éviter'; // red
        break;
      case 1:
        txt= 'inconnu'; // orange
        break;
      case 2:
        txt= 'yellow'; // yellow
        break;
      case 3:
        txt= 'acceptable'; // green
        break;
      default:
    }
    return  txt;
  }

  loadData(){
    this.additiveData = [];
    let data = this.additiveInput
    data.map(
      num => {
        //console.log(num)
        let additive = num[0].split(':')[1]
        let auth = this.getAdditiveAuthLevel(num[1])
        let name = num[2].name
        let type = num[3]
        let txtAlert = this.getAdditiveTextLevel(num[1])
        this.additiveData.push([additive, auth, name, type, txtAlert])
      }
    )
    this.total = this.additiveData.length
  }

  onClickModal(data){
    this.onModalOpen.emit(data)
  }

  onClickToggle(e){
     this.onToggle.emit(e)
  }

  ngOnInit(){
    this.loadData();
    //console.log(this.additiveData)
  }
}
