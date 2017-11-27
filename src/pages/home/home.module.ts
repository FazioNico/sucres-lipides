/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   22-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-11-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HomePage } from "./home";

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers: [BarcodeScanner]
})
export class HomeModule {}
