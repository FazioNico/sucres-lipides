/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
 */

 import { Component, Input } from '@angular/core';


 @Component({
   selector: 'product-header',
   templateUrl: 'product-header.html',
 })
 export class ProductHeaderComponent {

   @Input() productDataHeaderInput: any[];
   @Input() isClassOpacity: boolean = true;

 }
