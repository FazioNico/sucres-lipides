/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   20-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { ISearchState, ISearch } from "./store/search.state";
import { SearchStoreService } from "./store/search-store.service";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'SearchPage',
  segment: 'search'
})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit {

  private storeInfo:any;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private searchStore: SearchStoreService
  ) {
    this.storeInfo = this.searchStore.getDatas()
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe(
      () =>  {
        this.onPageScroll(event);
      }
    )
  }

  /** Events Methode **/
  onInutChange(searchDataInput){
    if (<number>searchDataInput.value.length < 3) return;

    //Keyboard.close()
    // if(this._st.online === true){
    //   this.loader = this.loadCtrl.create({
    //     content: "Chargement..."
    //   });
    //   this.loader.present();
    // }
    if (isNaN(searchDataInput.value) === true){
        /** query is a string **/
        this.queryString(searchDataInput.value)
    }
    else {
        /** query is a number **/
        this.queryNumber(searchDataInput.value)
    }
  }

  onGoProduct(event,product){
    console.log(product)
    this.navCtrl.push('ProductDetailPage', {data:product})
  }
  /**
   * Core methode
   */
  queryString(data:string){
    console.log(data)
    this.searchStore.dispatchLoadAction({path:data})
  }

  queryNumber(data:number){
  }

  onPageScroll(event) {
      //console.log(event);
      let ionHeader = this.content.getElementRef().nativeElement.previousElementSibling
      if(event.target.scrollTop >= 5){
          ionHeader.classList.add('scroll')
      }
      else {
        if (ionHeader.classList.contains('scroll') == true ){
          ionHeader.classList.remove('scroll')
        }
      }
  }
}
