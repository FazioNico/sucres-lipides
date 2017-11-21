/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   20-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SearchPage } from './search';
import { SearchService } from "./search.service";
import { SearchStoreModule } from "./store/search-store.module";

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    SearchStoreModule,
    IonicPageModule.forChild(SearchPage),
  ],
  providers: [SearchService],
  exports: [SearchPage]
})
export class SearchPageModule {}
