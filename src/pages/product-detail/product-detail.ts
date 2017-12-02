/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-12-2017
*/

import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import {Observable} from 'rxjs/Observable';

import { ProductStoreService } from "./store/product-detail-store.service";

/**
* Generated class for the ProductDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage({
  name: 'ProductDetailPage',
  segment: 'product/:id',
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public product$:Observable<any>;
  public titleUnvisible:boolean = true;
  public titleH1Unvisible:boolean = false;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ngZone: NgZone,
    private productStore: ProductStoreService
  ) {
    let params:any = this.navParams.get('data')|this.navParams.get('id')
    // if no params into navParams
    if(!params){
      console.log('no data and no id', this.navParams.get('data'),this.navParams.get('id'))
      window.location.href = './'
      return
    }
    // if have params...
    (this.navParams.get('data'))
      // if get full product datas
      ? this.product$ = Observable.of(this.navParams.get('data'))
      // if only have ID product, => do request to get all datas
      : this.findByID(this.navParams.get('id'));// this.product = this.navParams.get('id');
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((data)=>{
      this.onPageScroll(event);
    })
  }

  findByID(id:string):void{
    // console.log('findByID->', id)
    this.product$ = this.productStore.getDataItem();
    (id)
      ? this.productStore.dispatchLoadAction({path:id})
      : null;
  }

  onPageScroll(event):void {
    //console.log('onPageScroll', event.target.scrollTop)
    if(!event)return;
    let ionNavBarToolbar:HTMLElement = event.target.offsetParent.previousElementSibling.firstElementChild.firstElementChild;
    if(event.target.scrollTop >= 5){
      this._ngZone.run(() => {
        ionNavBarToolbar.classList.add('scroll')
        this.titleUnvisible = false;
        this.titleH1Unvisible = true;
      });
    }
    else {
      if (ionNavBarToolbar.classList.contains('scroll') == true ){
        this._ngZone.run(() => {
          ionNavBarToolbar.classList.remove('scroll')
          this.titleUnvisible = true;
          this.titleH1Unvisible = false;
        });
      }
    }
  }

  onClickToggle(e){
    if(!e)return;
    let el:any = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")

    setTimeout(_=>{
      console.log(el.nextElementSibling.offsetHeight)
      this.content.scrollTo(0,el.nextElementSibling.offsetHeight+window.innerHeight,550)
      //this.content.scrollToBottom()
      // (el.nextElementSibling.classList.contains('open'))
      //   ? this.content.scrollToBottom()
      //   : this.content.scrollToTop()
    },150)
  }

  onClickBack():void{
    this.navCtrl.setRoot('HomePage')
  }
}
