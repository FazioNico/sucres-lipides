/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-02-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { AboutPage } from '../pages/about/about';
import { AddPage } from '../pages/add/add';
import { HistoryPage } from '../pages/history/history';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { SearchPage } from '../pages/search/search';
import { UserPage } from '../pages/user/user';

import { FatComponent } from '../components/fat/fat';
import { HeaderContentComponent } from '../components/header-content/header-content';
import { MenuSlideComponent } from '../components/menu-slide/menu-slide';
import { ProductAdditiveComponent } from '../components/product-additive/product-additive';
import { ProductAlergensTracesComponent } from '../components/product-alergens-traces/product-alergens-traces';
import { ProductFocusComponent } from '../components/product-focus/product-focus';
import { ProductHeaderComponent } from '../components/product-header/product-header';
import { ProductIngredientComponent } from '../components/product-ingredient/product-ingredient';
import { ProductNotfoundComponent } from '../components/product-notfound/product-notfound';
import { ProductNutrimentComponent } from '../components/product-nutriment/product-nutriment';
import { ProductRelatedComponent } from '../components/product-related/product-related';
import { ScanComponent } from '../components/scan/scan';
import { SearchResultComponent } from '../components/search-result/search-result';
import { SugarComponent } from '../components/sugar/sugar';

import { SugarPipe } from '../pipes/sugar';
import { SortDescPipe } from '../pipes/SortDesc';

import { RoutesService }                   from '../providers/routes/routes'
import { ApiService }               from '../providers/api-service/api-service';
import { LocalStorageService }      from '../providers/local-storage/local-storage';
import { FirebaseService }                 from '../providers/firebase/firebase';
import { CONFIG_GFB }               from '../providers/firebase/fb_config';
import { StoreService }                 from '../providers/store/store';
import { AdditiveService }                 from '../providers/additive/additive';
import { WikipediaService }                 from '../providers/wikipedia/wikipedia';

import * as firebase            from 'firebase';

const pages:Array<any> = [
  AboutPage,
  AddPage,
  HistoryPage,
  HomePage,
  ProductPage,
  SearchPage,
  UserPage
];
const components:Array<any> = [
  FatComponent,
  HeaderContentComponent,
  MenuSlideComponent,
  ProductAdditiveComponent,
  ProductAlergensTracesComponent,
  ProductFocusComponent,
  ProductHeaderComponent,
  ProductIngredientComponent,
  ProductNotfoundComponent,
  ProductNutrimentComponent,
  ProductRelatedComponent,
  ScanComponent,
  SearchResultComponent,
  SugarComponent
];
const providers:Array<any> = [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  RoutesService,
  ApiService,
  LocalStorageService,
  FirebaseService,
  StoreService,
  AdditiveService,
  WikipediaService
];
const pipes:Array<any> = [
  SugarPipe,
  SortDescPipe
];
const ionicAppConfig:Object = {
  tabsPlacement: 'top',
  mode: 'md'
};
const InitFirebase = firebase.initializeApp(CONFIG_GFB);

@NgModule({
  declarations: [MyApp, ...pages, ...components, ...pipes],
  imports: [
    IonicModule.forRoot(MyApp, ionicAppConfig, InitFirebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...pages],
  providers: [...providers]
})
export class AppModule {}
