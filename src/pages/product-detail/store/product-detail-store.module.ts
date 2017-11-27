/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   23-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
 */

 import { NgModule } from '@angular/core';
 import { EffectsModule } from '@ngrx/effects';
 import { StoreModule } from '@ngrx/store';
 import { StoreDevtoolsModule } from '@ngrx/store-devtools';

 import { reducer } from "./product-detail.reducer";
 import { ProductEffects } from "./product-detail.effects";
 import { ProductStoreService } from "./product-detail-store.service";

 @NgModule({
   imports: [
     StoreModule.forFeature('dataObject', reducer),
     StoreDevtoolsModule.instrument(),
     EffectsModule.forFeature([ProductEffects])
   ],
   exports: [StoreModule, EffectsModule],
   providers: [ProductStoreService]
 })
 export class ProductDetailStoreModule {}
