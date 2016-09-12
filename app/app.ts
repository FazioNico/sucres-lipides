/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 18-08-2016
*/

import {
  Component,
  PLATFORM_DIRECTIVES,
  provide,
  Inject,
  ViewChild
}                                   from '@angular/core';
import {
  Platform,
  ionicBootstrap,
  NavController,
  MenuController
}                                   from 'ionic-angular';
import { Http, HTTP_PROVIDERS }     from '@angular/http';
import { StatusBar, Keyboard }      from 'ionic-native';

import { HeaderContent }            from './components/header-content/header-content';
import { MenuSlide }                from './components/menu-slide/menu-slide';
import { Scan }                     from './components/scan/scan';

import { HomePage }                 from './pages/home/home';

import { Routes }                   from './providers/routes/routes'
import { ApiService }               from './providers/api-service/api-service';
import { LocalStorageService }      from './providers/local-storage/local-storage';
import { Additive }                 from './providers/additive/additive';
import { CONFIG_GFB }               from './providers/firebase/config';


import * as firebase                from 'firebase';

@Component({
  templateUrl: 'build/app.html',
  providers: [
    Routes,
    ApiService,
    LocalStorageService,
    Additive
  ],
  directives: [
    MenuSlide,
    Scan
  ]
})
export class MyApp {

  isAuth:boolean = false;
  rootPage: any;

  @ViewChild(Scan) scanPlugin: Scan;
  /**
      use @ViewChild instead to grab the NavController instance
      view more on:  https://forum.ionicframework.com/t/why-cant-i-import-navcontroller-and-viewcontroller-into-service-or-app/40999/12
  **/
  @ViewChild('appcontent') nav: NavController;

  constructor(platform: Platform, private routes:Routes,public menuCtrl: MenuController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      Keyboard.hideKeyboardAccessoryBar(false);
      if(navigator.onLine == false){
        console.log('disconnected')
      }
      else {
        firebase.initializeApp(CONFIG_GFB);
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.isAuth = true
          } else {
            this.isAuth = false
          }
        });
      }
      StatusBar.show();
      StatusBar.overlaysWebView(false);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString("#0288d1");
    });
  }

  /** todo : testing function **/
  onEventMenuClick(event){
    //console.log(event.page)

    let navPage = this.nav.getActive()
    this.menuCtrl.close();

    switch (event.page) {
      case 'SearchPage':
        if(navPage.name != event.page){
          this.nav.setRoot(this.routes.getPage(this.routes.SEARCH))
        }
        break;
      case 'AboutPage':
        if(navPage.name != event.page){
          this.nav.setRoot(this.routes.getPage(this.routes.ABOUT))
        }
        break;
      case 'UserPage':
        if(navPage.name != event.page){
          this.nav.setRoot(this.routes.getPage(this.routes.USER))
        }
        break;
      case 'HistoryPage':
        if(navPage.name != event.page){
          this.nav.push(this.routes.getPage(this.routes.HISTORY))
        }
        break;
      case 'ScanPage':
        this.goScan();
        break;
    }

  }
  goScan(){
    //console.log('goScan function')
    this.scanPlugin.scanCode().then((result)=>{
      //console.log(result)
      if(result){
        this.nav.push(this.routes.getPage(this.routes.PRODUCT), { id: result.text });
      }
    })
  }
  ngOnInit() {
    this.rootPage = this.routes.getRootPage()
  }
}

ionicBootstrap(MyApp, [ HTTP_PROVIDERS ],{
    mode: 'md',
    platforms: {
     ios: {
       tabbarPlacement: 'top',
     }
   }
});
