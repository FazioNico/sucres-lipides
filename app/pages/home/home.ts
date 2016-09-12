/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   18-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-07-2016
*/

import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Routes} from '../../providers/routes/routes'
import { Scan } from '../../components/scan/scan';


@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [Scan]
})
export class HomePage {

  @ViewChild(Scan)
  private scanPlugin: Scan;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [[NavController], [Routes]];
  }
  constructor(public nav: NavController, private routes:Routes) {
  }

  goSearch(){
    this.nav.push(this.routes.getPage(this.routes.SEARCH))
  }

  goScan(){
    this.scanPlugin.scanCode().then((result)=>{
      //console.log(result)
      if(result){
        this.nav.push(this.routes.getPage(this.routes.PRODUCT), { id: result.text });
      }
    })
  }
}
