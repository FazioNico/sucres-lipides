/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-08-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-08-2016
*/

import {
  Component,
  ViewChild
}                           from '@angular/core';
import {
  NavController,
  Loading,
  Content,
  Alert
}                           from 'ionic-angular';

import * as _               from 'lodash';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HeaderContent }    from '../../components/header-content/header-content';

import { Routes }           from '../../providers/routes/routes';
import { FirebaseService }  from '../../providers/firebase/firebase';
import { Store }            from '../../providers/store/store';

import { SortDesc }         from '../../pipes/SortDesc';



/*
  Generated class for the HistoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/history/history.html',
  directives: [HeaderContent],
  providers: [
    FirebaseService,
    Store
  ],
  styles: [`
      .img_thumb {
        background-size: contain;
        background-position: center center;
        height: 80px;
        width: 80px;
        border-radius: 80px;
      }
    `],
  pipes:[SortDesc]
})
export class HistoryPage {

  isAuth:boolean = false;
  user:any;
  historySearch:any[] = [];
  offlineTxt:boolean = true;
  loading:Loading;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [
          [NavController],
          [Routes],
          [FirebaseService],
          [Store]
        ];
  }

  @ViewChild(Content)       content       : Content;

  constructor(
    private nav       : NavController,
    private routes    : Routes,
    public authData   : FirebaseService,
    private _st       : Store
  ) {
    if(this._st.online === true){
      //// Check if user Auth == true
      this.authData = authData;
      this.authData.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          this.isAuth = true
          this.user = user
          // load history list
          this.loading = Loading.create({
            content: "Chargement..."
          });
          this.nav.present(this.loading);
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
            .then((data) => {
              if(data.status != 0){
                let productOrder = _.find(arrayDataSortedLimited, (o) => { return o[0] == data.product.id; });
                data.product._order = productOrder[1];
                data.product._nbrView = productOrder[2];
                this.historySearch.push(data.product)
              }

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
    this.loading.dismiss();
  }

  clearHistory(){
    console.log('clearHistory')
    if(this.user){
      console.log(this.user.uid)
      this.authData
      .database.ref('historySearch/' + this.user.uid).remove()
      .then(()=> this.historySearch = [])
    }

  }
  /** Events Methode **/
  onClickBack(){
    this.nav.pop()
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

  onGoProduct(event,id){

    this.loading = Loading.create({
      content: "Chargement...",
      dismissOnPageChange: true,
    });
    this.nav.present(this.loading);
    setTimeout(()=>{
      this.nav.push(
        this.routes.getPage(this.routes.PRODUCT),
        { id: id }
      );
    },800)

  }

  onClearHistory(){
    let alert = Alert.create({
      title: "Effacer l'historique",
      message: "Veux tu effecer l'hisorique des produits consulté?",
      buttons: [{
        text: 'Annuler',
        handler: () => {
          //console.log('annuler press');
        }
      },
      {
        text: 'Efecer',
        handler: () => {
          this.clearHistory()
          //console.log('ok press');
        }
      }]
    });
    this.nav.present(alert);
  }
  /*** Ionic ViewEvent ***/
  ngAfterViewInit() {
    this.content.addScrollListener(
      (event) =>  {
        this.onPageScroll(event);
      }
    )
  }

}
