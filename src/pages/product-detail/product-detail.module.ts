/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 25-11-2017
 */

import { NgModule, forwardRef } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { ProductHeaderComponent } from "./components/product-header/product-header";
import { ProductFocusComponent } from "./components/product-focus/product-focus";
import { SugarComponent } from "./components/sugar/sugar";
import { FatComponent } from "./components/fat/fat";
import { NutrimentComponent } from "./components/nutriments/nutriments";
import { IngredientsComponent } from "./components/ingredients/ingredients";

import { ProductDetailStoreModule } from "./store/product-detail-store.module";
import { SugarPipe } from "./pipes";
import { ProductService } from "./product-detail.service";

export const PRODUCT_COMPONENTS:any[] = [
  ProductHeaderComponent,
  ProductFocusComponent,
  SugarComponent,
  FatComponent,
  NutrimentComponent,
  IngredientsComponent
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
    ProductDetailStoreModule,
    IonicPageModule.forChild(ProductDetailPage),
  ],
  providers: [ProductService]
})
export class ProductDetailPageModule {}
