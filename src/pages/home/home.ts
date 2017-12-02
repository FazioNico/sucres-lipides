/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-12-2017
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Store } from '@ngrx/store';

export class IBarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}

@IonicPage({
  name: 'HomePage',
  segment: 'index'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public isDesktop:boolean = false;

  constructor(
    public navCtrl: NavController,
    protected store: Store<any>,
    private nativeScan:BarcodeScanner,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.isDesktop = this.platform.is('mobileweb') || this.platform.is( 'core')
    })
  }

  goSearch():void{
    this.store.dispatch({type:'CLEAR'})
    this.navCtrl.push('SearchPage')
  }

  goScan():void{
    this.nativeScan.scan()
    .then((result) => {
      if (!result.cancelled) {
        const barcodeData:IBarcodeData = new IBarcodeData(result.text, result.format);
        // console.log('scan result->', barcodeData)
        this.navCtrl.push('ProductDetailPage',  { id: barcodeData.text })
      }
    })
    .catch((err) => {
      //alert(err);
      //console.log(err)
      this.store.dispatch({type:'[Err] Display Requested', payload: {message:err}})
    })
  }
}
