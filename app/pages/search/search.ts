/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   18-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-07-2016
*/

import { Component, ViewChild }             from '@angular/core';
import {
  NavController,
  Loading,
  Content
}                                           from 'ionic-angular';

import { Keyboard }                         from 'ionic-native';

import { Routes }                           from '../../providers/routes/routes';
import { Store }                            from '../../providers/store/store';
import { FirebaseService }                  from '../../providers/firebase/firebase';

import { HeaderContent }                    from '../../components/header-content/header-content';
import { SearchResult }                     from '../../components/search-result/search-result';

/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/search/search.html',
  directives: [
    HeaderContent,
    SearchResult
  ],
  providers: [
    [Store],
    [FirebaseService]
  ]
})
export class SearchPage {

  isAuth:boolean = false;
  searchResultData: any;
  loading:Loading;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [
          [NavController],
          [Routes],
          [Store],
          [FirebaseService]
        ];
  }

  @ViewChild(Content)       content       : Content;

  constructor(
    private nav       : NavController,
    private routes    : Routes,
    private _st       : Store,
    public authData   : FirebaseService
  ){
    this.loading;
    if(this._st.online === true){
      this.authData = authData;
      this.authData.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.isAuth = true
        } else {
          this.isAuth = false
        }
      });
    }
    else {
      this.isAuth = false
    }
  }

  /** Core Methode **/
  private hideLoading(){
    this.loading.dismiss();
  }

  private queryString(searchDataInput) {
    this._st.getData(searchDataInput.value)
        .subscribe(
          (data) => {
            this._st.data = data
            this.searchResultData = data
            if(this._st.online === true){
                this.hideLoading()
            }
          },
          (err) => {
            console.log(err)
          },
          () => {
            if(Object.keys(this.searchResultData).length == 0) {
              this.nav.push(
                this.routes.getPage(this.routes.PRODUCT),
                { id: 'inconnu' }
              );
            }
          }
        );

  }

  private queryNumber(searchDataInput) {
    this._st.getProductData(searchDataInput.value)
        .subscribe(
          (data) => {
            if(data.status === 1){
              this.searchResultData = []
              this.searchResultData.push(data.product)

              if(this._st.online === true){
                  this.hideLoading()
              }
              //console.log(data.product)
            }
            else {

              if(this._st.online === true){
                  this.hideLoading()
              }

              this.searchResultData = []
              this.nav.push(
                this.routes.getPage(this.routes.PRODUCT),
                { id: searchDataInput.value }
              );
            }
          },
          (err) => {
            console.log(err)
          }
        );
  }

  /** Events Methode **/
  onInutChange(searchDataInput){
    if (<number>searchDataInput.value.length < 3) return;

    Keyboard.close()

    if(this._st.online === true){
      this.loading = Loading.create({
        content: "Chargement..."
      });
      this.nav.present(this.loading);
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

  onGoProduct(event,id){

    this.loading = Loading.create({
      content: "Chargement...",
      dismissOnPageChange: true,
    });
    this.nav.present(this.loading);

    let self = this;
    setTimeout(function(){
      self.nav.push(
        self.routes.getPage(self.routes.PRODUCT),
        { id: event.id }
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
    this.nav.pop()
  }
  /*** Ionic ViewEvent ***/
  ionViewDidLeave(){
    //this.hideLoading()
  }

  ionViewDidEnter(){
    this.loading = Loading.create({
      content: "Chargement...",
      dismissOnPageChange: true,
    });
  }

  ngAfterViewInit() {
    this.content.addScrollListener(
      (event) =>  {
        this.onPageScroll(event);
      }
    )
  }
}
