/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
*/

import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from "./search.reducer";
import { SearchEffects } from "./search.effects";
import { SearchStoreService } from "./search-store.service";

@NgModule({
  imports: [
    StoreModule.forFeature('datasArray', reducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([SearchEffects])
  ],
  exports: [StoreModule, EffectsModule],
  providers: [SearchStoreService]
})
export class SearchStoreModule {}
