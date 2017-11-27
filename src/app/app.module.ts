/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   15-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-11-2017
 */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Import RXJS as globale
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { EnvironmentsModule } from "./environment/environment.module";
import { NgRxStoreModule } from "../store/store.module";

const ionicAppConfig:Object = {
  tabsPlacement: 'top',
  mode: 'md'
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    EnvironmentsModule.forRoot(),
    NgRxStoreModule.forRoot(),
    IonicModule.forRoot(MyApp, ionicAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
