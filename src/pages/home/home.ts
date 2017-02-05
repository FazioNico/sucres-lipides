/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ScanComponent } from '../../components/scan/scan';

import { RoutesService } from '../../providers/routes/routes'
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(ScanComponent)
  private scanPlugin: ScanComponent;

  constructor(
    public nav: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');
  }

  goSearch(){
    this.nav.push(RoutesService.getPage(RoutesService.SEARCH))
  }

  goScan(){
    this.scanPlugin.scanCode().then((result)=>{
      //console.log(result)
      if(result){
        this.nav.push(RoutesService.getPage(RoutesService.PRODUCT), { search: result.text });
      }
    })
  }
}
