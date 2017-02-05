/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Content } from 'ionic-angular';
//import { Keyboard }                         from 'ionic-native';

import { RoutesService } from '../../providers/routes/routes';
import { StoreService } from '../../providers/store/store';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  isAuth:boolean = false;
  searchResultData: any;
  loader:any;

  @ViewChild(Content)       content       : Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl:LoadingController,
    private _st: StoreService
  ) {}

  /** Events Methode **/
  onInutChange(searchDataInput){
    if (<number>searchDataInput.value.length < 3) return;

    //Keyboard.close()

    if(this._st.online === true){
      this.loader = this.loadCtrl.create({
        content: "Chargement..."
      });
      this.loader.present();
    }
    if (isNaN(searchDataInput.value) === true){
        /** query is a string **/
        this.queryString(searchDataInput)
    }
    else {
        /** query is a number **/
        this.queryNumber(searchDataInput)
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchPage');
  }


  onGoProduct(event,product){

    this.loader = this.loadCtrl.create({
      content: "Chargement...",
    });
    this.loader.present();

    setTimeout(()=>{
      this.navCtrl.push(
        RoutesService.getPage(RoutesService.PRODUCT),
        { product: event.product}
      );
    },800)

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

  onClickBack(){
    this.navCtrl.pop()
  }

  ionViewDidLeave(){
    this.hideLoading()
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe(
      () =>  {
        this.onPageScroll(event);
      }
    )
  }

  /** Core Methode **/
  private hideLoading(){
    if(this.loader){
      //console.log('diss loader',)
      this.loader.dismiss();
    }
  }

  private queryString(searchDataInput) {
    this._st.getData(searchDataInput.value)
        .subscribe(
          (data) => {
            this._st.data = data
            this.searchResultData = data
          },
          (err) => {
            console.log(err)
          },
          () => {

            if(this._st.online === true){
                this.hideLoading()
            }
            if(Object.keys(this.searchResultData).length == 0) {
              this.navCtrl.push(
                RoutesService.getPage(RoutesService.PRODUCT),
                { notFound: searchDataInput.value }
              );
              //console.log('notFound')
              return
            }

          }
        );

  }

  private queryNumber(searchDataInput) {
    this._st.getProductData(searchDataInput.value)
        .subscribe(
          (data:any) => {

            if(this._st.online === true){
                this.hideLoading()
            }
            if(data.status === 1){
              this.searchResultData = []
              this.searchResultData.push(data)
              //console.log(data.product)
            }
            else {
              console.log('Not found: data.status->',data.status )
              this.searchResultData = []
              this.navCtrl.push(
                RoutesService.getPage(RoutesService.PRODUCT),
                { notFound: searchDataInput.value }
              );
            }
          },
          (err) => {
            console.log(err)
          },
          ()=>{

          }
        );
  }
}
