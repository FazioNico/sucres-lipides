/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController, AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

import { RoutesService } from '../../providers/routes/routes';
import { FirebaseService }from '../../providers/firebase/firebase';
import { StoreService } from '../../providers/store/store';

// import { SortDesc } from '../../pipes/SortDesc';
/*
  Generated class for the History page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  isAuth:boolean = false;
  user:any;
  historySearch:any[] = [];
  offlineTxt:boolean = true;
  loader:any;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authData: FirebaseService,
    private _st: StoreService
  ) {
    if(this._st.online === true){
      //// Check if user Auth == true
      this.authData = authData;
      this.authData.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.isAuth = true
          this.user = user
          // load history list
          this.loader = this.loadCtrl.create({
            content: "Chargement..."
          });
          this.loader.present();
          this.loadDataHistory(user)
        } else {
          this.isAuth = false
        }
      });
    }
    else {
      //offline mode
      this.isAuth = false
      this.offlineTxt = false
    }
  }

  loadDataHistory(user){

    let historySearch = [];
    this.authData
    .database.ref('historySearch/' + user.uid)
    .once('value', (snapshot) => {
      //console.log(snapshot.val());
      if(snapshot.val() === null){
        // no historySearch
        this.hideLoading();
      }
      else {
        for (var key in snapshot.val()) {
          if (snapshot.val().hasOwnProperty(key)) {
            //console.log(key, snapshot.val()[key])
            historySearch.push([key, snapshot.val()[key].time, snapshot.val()[key].nbr])
          }
        }
        //console.log('user historySearch database.ref() exist.')
        this.searchDataProduct(historySearch)
      }
    });
  }


  searchDataProduct(arrayData){
    let arrayDataSorted = arrayData.sort((a,b) => {
        if (a.time > b.time)
          return 1;
        if (a.time < b.time)
          return -1;
        return 0;
    });

    let arrayDataSortedLimited = arrayDataSorted.slice(0,19)
    //console.log(arrayDataSortedLimited,arrayDataSorted)

    let displayHistory = new Promise((resolve, reject)=>{
      try {
        resolve(
          arrayDataSortedLimited.map((k)=>{
            let code = k[0];
            this._st.getProductData(code)
            .toPromise()
            .then((data:any) => {
              if(data.status === 0){
                return false
              }
              let productOrder = _.find(arrayDataSortedLimited, (o) => { return o[0] == data.product.id; });
              if(!productOrder){
                return false
              }
              data.product._order = productOrder[1];
              data.product._nbrView = productOrder[2];
              this.historySearch.push(data.product)
              //console.log('History test-> ',productOrder)
            })
          })
        );
        return
      } catch (e) {
        reject(e);
      }
    })
    displayHistory.then(()=>{
      this.hideLoading();
    })


  }
  private hideLoading(){
    if(this.loader){
      this.loader.dismiss();
    }
  }

  clearHistory(){
    //console.log('clearHistory')
    if(this.user){
      console.log(this.user.uid)
      this.authData
      .database.ref('historySearch/' + this.user.uid).remove()
      .then(()=> this.historySearch = [])
    }

  }
  /** Events Methode **/
  onClickBack(){
    this.navCtrl.pop()
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

  onGoProduct(event,product){
    this.loader = this.loadCtrl.create({
      content: "Chargement...",
      dismissOnPageChange: true,
    });
    this.loader.present();

    setTimeout(()=>{
      this.navCtrl.push(
        RoutesService.getPage(RoutesService.PRODUCT),
        { product: product }
      );
    },800)

  }

  onClearHistory(){
    let alert = this.alertCtrl.create({
      title: "Effacer l'historique",
      message: "Veux-tu effacer l'historique des produits consultés?",
      buttons: [{
        text: 'Annuler',
        handler: () => {
          //console.log('annuler press');
        }
      },
      {
        text: 'Effacer',
        handler: () => {
          this.clearHistory()
          //console.log('ok press');
        }
      }]
    });
    alert.present();
  }
  // /*** Ionic ViewEvent ***/
  ngAfterViewInit() {
    this.content.ionScroll.subscribe(
      () =>  {
        this.onPageScroll(event);
      }
    )
  }
}
