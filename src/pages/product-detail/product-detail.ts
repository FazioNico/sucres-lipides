/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-11-2017
*/

import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
* Generated class for the ProductDetailPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage({
  name: 'ProductDetailPage',
  segment: 'product/:id'
})
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public product:any;
  public titleUnvisible:boolean = true;
  public titleH1Unvisible:boolean = false;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _ngZone: NgZone
  ) {
    if(!this.navParams.get('data')){
      window.location.href = './'
      return
    }
    this.product = this.navParams.get('data')
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((data)=>{
      //console.log('event->', data)
      this.onPageScroll(event);
    })
  }


  onPageScroll(event) {
    //console.log('onPageScroll', event.target.scrollTop)
    let ionNavBarToolbar = event.target.offsetParent.previousElementSibling.firstElementChild.firstElementChild;
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

}
