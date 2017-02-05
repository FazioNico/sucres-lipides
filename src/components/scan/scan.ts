/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   18-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 02-01-2017
*/

import { Component } from '@angular/core';
import {BarcodeScanner}           from 'ionic-native';

/*
  Generated class for the Scan component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'scan-plug',
  templateUrl: 'scan.html'
})
export class ScanComponent {

  barcodeData: IBarcodeData;
  scanDetails:any;

  constructor() {
    //console.log('Hello Scan Component');
  }

  scanCode() {
    return BarcodeScanner.scan()
    .then((result) => {
      if (!result.cancelled) {
        const barcodeData = new IBarcodeData(result.text, result.format);
        //return this.goScanDetails(barcodeData);
        return barcodeData;
        /** to check in template: **/
        //this.scanDetails = barcodeData;
      }
    })
    .catch((err) => {
      alert(err);
    })
  }
}

export class IBarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}
