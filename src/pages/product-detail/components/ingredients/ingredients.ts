/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   25-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 25-11-2017
 */

 import { Component, Input, EventEmitter, Output } from '@angular/core';

 /*
   Generated class for the ProductIngredient component.
   See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
   for more info on Angular 2 Components.
 */
 @Component({
   selector: 'ingredients',
   template: `
   <div class="acc-item">
     <h3 (click)="onClickToggle($event)" padding class="acc-title">
       Liste des ingredients ({{ ingredientsInput.length }})
       <span><ion-icon name="ios-add"></ion-icon></span>
     </h3>
     <div class="acc-content">
       <div padding>
         <ion-badge class="line-badge" color="secondarytext" *ngFor="let ingredient of ingredientsInput"> {{ ingredient.text}} </ion-badge>
       </div>
     </div>
   </div>
   `
 })
 export class IngredientsComponent {

   @Input() ingredientsInput: any[];
   @Output() onToggle: EventEmitter<any> = new EventEmitter();

   onClickToggle(e){
      this.onToggle.emit(e)
   }

 }
