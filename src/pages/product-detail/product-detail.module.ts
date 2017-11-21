/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { ProductHeaderComponent } from "./components/product-header/product-header";
import { ProductFocusComponent } from "./components/product-focus/product-focus";
import { SugarComponent } from "./components/sugar/sugar";

import { SugarPipe } from "./pipes";

export const PRODUCT_COMPONENTS:any[] = [
  ProductHeaderComponent,
  ProductFocusComponent,
  SugarComponent,
]
export const PRODUCT_PIPES:any[] =  [
  SugarPipe
];
@NgModule({
  declarations: [
    ProductDetailPage,
    ...PRODUCT_COMPONENTS,
    ...PRODUCT_PIPES
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
  ],
})
export class ProductDetailPageModule {}
