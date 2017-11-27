/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   24-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 24-11-2017
 */

 import { Component, Input } from '@angular/core';

 @Component({
   selector: 'fat',
   templateUrl: 'fat.html'
 })
 export class FatComponent {

   @Input() dataInput: number;

   setLiquid(value){
     const perCent:number  = 100
     const maxGR:number 	  = 70
     return Math.round(perCent - ( (value/maxGR) * perCent) ).toString() + '%'
   }

 }
