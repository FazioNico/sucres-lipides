/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Injectable, OnInit }   from '@angular/core';

//import { Observable }           from 'rxjs/Observable';
import { fromPromise }          from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ApiService }           from '../api-service/api-service';
import { LocalStorageService }  from '../local-storage/local-storage';
import { AdditiveService }             from '../additive/additive';

import * as _                   from 'lodash';

/*
  Generated class for the Store provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class StoreService implements OnInit{

  data:any;

  dataAPI:any;
  dataLS:any;
  dataEAD:any;
  online:boolean = true;

  constructor(

    private _api    : ApiService,
    private _ls     : LocalStorageService,
    private _ea     : AdditiveService

  ){

    if(navigator.onLine == false){
      this.online = false
    }
    this.loadAdditiveDataEA();
    // this.online = false
  }

  /*** call Methode ***/
  getData(value){
    let dataReady;
    let dataLS = this.getDataLS()             /** get data LS  **/

    if(this.online == true){
      //console.log('online!')
      let dataAPI = this.getDataAPI(value)    /** get data API  **/
      this.setDataToCombine(dataAPI,dataLS)   /** combin data & save to LS  **/
      dataReady = dataAPI                     /** return data API **/
    }
    else {
      //console.log('offline!')
      dataReady =  this.dataToObservable(dataLS, 'product_name', value)
    }
    return dataReady;
  };

  getProductData(value){
    if(this.online == true){
      return this.getProductDataAPI(value);
    }
    else {
      return this.getProductDataLS(value);
    }
  }

  getCategorieData(value){
    if(this.online == true){
      return this.getCategorieDataAPI(value);
    }
    else {
      return null;
    }
  }
  getAdditiveData(value){
    return this.getAdditiveDataEA(value);
  }

  /*** formationg Method ***/
  dataToObservable(dataLS, key, value){
    let newArray = []
    let promise = dataLS
      .then(
      (data) => {
        //// for get only one product
        if(key == 'id'){
          let test =  _.filter(data,{ [key]: value })
          return test
        }
        //// Else : Bof -  filter for search in all product
        ///  .then return list of product contains value (like regex)
        _.forIn(data, function(val, key) {
          if(_.lowerCase(val.product_name).search(_.lowerCase(value)) != -1){
            newArray.push(val)
          }
          return data
        });
        return newArray
        //// Eof - filter for search product
      }
    )
    return fromPromise(promise)
  }

  setDataToCombine(ObservableDataAPI,PromiseDataLS){
    return PromiseDataLS.then(
      (data) => this.dataLS = data
    )
    .then(
      () => {
        // now dataLS Loaded then load dataAPI
        return ObservableDataAPI.subscribe(
          (res) => this.dataAPI = (res),
          (err) => console.log(err),
          () => {
            let dataCombined = _.unionWith(this.dataLS, this.dataAPI, _.isEqual);
            this.setDataLS(dataCombined)
            return dataCombined
          }
        )

      }
    )
  }
  /*** ########################## ***/

  /*** E-Additive Provider Methode ***/
  loadAdditiveDataEA(){
    this._ea.load()
    .then((data)=>{
      this.dataEAD = this._ea.data
      //console.log(this.dataEAD)
      //console.log(this.getAdditiveDataEA('101'))
      //console.log(this.getAdditiveAuthLevel(this.getAdditiveDataEA('100')))
    })
  }
  getAdditiveDataEA(value:any){
    return  _.filter(this.dataEAD,{ id: value })[0]
  }
  /*** Food API Methode ***/
  getDataAPI(value){
    return this._api.getData(value)
        .map(
          (data) => {
            // this.data = data.products
            // return data.products
            return data
          }
        )
  }

  getProductDataAPI(value){
    return this._api.getProductData(value);
  }

  getCategorieDataAPI(value){
    return this._api.getCategorieData(value)
  }

  savedata(data){
    return this._api.save(data)
  }
  saveImg(img,barcode){
    return this._api.postImg(img,barcode)
  }

  /*** LocalStorageService Methode ***/
  getDataLS(){
    // return data from _ls
    return this._ls.get('products_data')
          .then(
            (data) => {
              if (data){
                return JSON.parse(data)
              }
              else {
                return []
              }
            }
          )
  }

  getProductDataLS(value){
      let dataLS = this.getDataLS()             /** get data LS  **/
      return this.dataToObservable(dataLS, 'id', value);
  }

  setDataLS(dataArray){
    // remove old data LS
    this.removeDataLS()
    // save concat data to LS
    this._ls.set('products_data', JSON.stringify(dataArray))
  }

  removeDataLS(){
      this._ls.remove('products_data')
  }

  ngOnInit(){
  }

}
