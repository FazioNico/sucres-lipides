/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
*/

import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Action, Store } from '@ngrx/store';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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

  barcodeData: IBarcodeData;
  scanDetails:any;

  constructor(
    public navCtrl: NavController,
    protected store: Store<any>,
    private nativeScan:BarcodeScanner
  ) {

  }

  goSearch(){
    this.store.dispatch({type:'CLEAR'})
    this.navCtrl.push('SearchPage')
  }

  goScan(){
    this.nativeScan.scan()
    .then((result) => {
      if (!result.cancelled) {
        const barcodeData = new IBarcodeData(result.text, result.format);
        //return this.goScanDetails(barcodeData);
        //return barcodeData;
        this.navCtrl.push('ProductDetailPage',  { id: barcodeData.text })
        /** to check in template: **/
        //this.scanDetails = barcodeData;
      }
    })
    .catch((err) => {
      alert(err);
      this.navCtrl.push('ProductDetailPage',  { id: '737628064502' })
    })
  }
}
