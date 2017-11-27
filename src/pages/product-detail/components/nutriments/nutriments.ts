/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   25-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 25-11-2017
 */
 import { Component, Input, EventEmitter, Output, OnInit  } from '@angular/core';

 /*
   Generated class for the ProductNutriment component.
   See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
   for more info on Angular 2 Components.
 */
 @Component({
   selector: 'nutriments',
   templateUrl: 'nutriments.html'
 })
 export class NutrimentComponent implements OnInit{

   energy_100g:number;
   energy_serving: number;

   @Input() nutrimentsInput:any;
   @Output() onToggle: EventEmitter<any> = new EventEmitter();


   getWidth(data){
     return Math.round((data)).toString() + '%'
   }


   getOMSvalue(data,max){
     return Math.round(((data * 100) / (max * 2))).toString() + '%'
   }

   onClickToggle(e){
      this.onToggle.emit(e)
   }

   ngOnInit(){
     this.energy_100g = Math.round((this.nutrimentsInput.energy_100g * 0.2388))
     this.energy_serving = Math.round((this.nutrimentsInput.energy_serving * 0.2388))
   }
 }
