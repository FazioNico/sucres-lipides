/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-11-2017
*/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Action, Store } from '@ngrx/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    protected store: Store<any>
  ) {

  }

  goSearch(){
    this.store.dispatch({type:'CLEAR'})
    this.navCtrl.push('SearchPage')
  }

  goScan(){
    //   this.scanPlugin.scanCode()
    //   .then((result)=>{
    //     //console.log(result)
    //     if(result){
    //       this.nav.push(RoutesService.getPage(RoutesService.PRODUCT), { search: result.text });
    //     }
    //   })
  }
}
