/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   01-02-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ScanComponent } from '../components/scan/scan';
import { RoutesService } from '../providers/routes/routes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  isAuth:boolean = false;

  @ViewChild('appcontent') nav: NavController;
  @ViewChild(ScanComponent)
  private scanPlugin: ScanComponent;

  constructor(platform: Platform,public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //StatusBar.styleDefault();
      //Splashscreen.hide();
      StatusBar.show();
      StatusBar.overlaysWebView(false);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString("#0288d1");
    });
  }

  onEventMenuClick(event){
    //console.log(event.page)
    let navPage = this.nav.getActive()
    this.menuCtrl.close();

    switch (event.page) {
      case 'SearchPage':
        if(navPage.name != event.page){
          this.nav.setRoot(RoutesService.getPage(RoutesService.SEARCH))
        }
        break;
      case 'AboutPage':
        if(navPage.name != event.page){
          this.nav.setRoot(RoutesService.getPage(RoutesService.ABOUT))
        }
        break;
      case 'UserPage':
        if(navPage.name != event.page){
          this.nav.setRoot(RoutesService.getPage(RoutesService.USER))
        }
        break;
      case 'HistoryPage':
        if(navPage.name != event.page){
          this.nav.push(RoutesService.getPage(RoutesService.HISTORY))
        }
        break;
      case 'ScanPage':
        this.scanPlugin.scanCode().then((result)=>{
          //console.log(result)
          if(result){
            this.nav.push(RoutesService.getPage(RoutesService.PRODUCT), { search: result.text });
          }
        })
        break;
    }
  }

}
