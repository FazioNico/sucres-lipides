/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
 */

 import { Component, Input } from '@angular/core';

 @Component({
   selector: 'sugar',
   templateUrl: 'sugar.html'
 })
 export class SugarComponent {

   sugarWidth:number;
   @Input() dataInput: number;

   constructor(
   ) {
     this.sugarWidth = 13.5
   }

   getWidth(sugarData){
     return Math.round((sugarData/this.sugarWidth)).toString() + 'rem'
   }
 }
