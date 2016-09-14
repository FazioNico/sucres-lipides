/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   18-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-07-2016
*/

import { Component, ViewChild }               from '@angular/core';
import {
  NavController,
  NavParams,
  Content,
  Loading,
  MenuController,
  Alert
}                                             from 'ionic-angular';

import { Store }                              from '../../providers/store/store';
import { FirebaseService }                    from '../../providers/firebase/firebase';
import { Wikipedia }                          from "../../providers/wikipedia/wikipedia";
//import { Routes }                             from '../../providers/routes/routes';

import { HeaderContent }                      from '../../components/header-content/header-content';
import { ProductHeader }                      from '../../components/product-header/product-header';
import { ProductFocus }                       from '../../components/product-focus/product-focus';
import { ProductNutriment }                   from '../../components/product-nutriment/product-nutriment';
import { ProductIngredient }                  from '../../components/product-ingredient/product-ingredient';
import { ProductAdditive }                    from '../../components/product-additive/product-additive';
import { ProductRelated }                     from '../../components/product-related/product-related';
import { ProductNotfound }                    from '../../components/product-notfound/product-notfound';
import { MenuSlide }                          from '../../components/menu-slide/menu-slide';
import { ProductAlergensTraces }              from "../../components/product-alergens-traces/product-alergens-traces";

import { AddPage }                            from '../add/add';
import { UserPage }                           from '../user/user';


/*
  Generated class for the ProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/product/product.html',
  directives: [
    HeaderContent,
    ProductHeader,
    ProductFocus,
    ProductNutriment,
    ProductIngredient,
    ProductAdditive,
    ProductAlergensTraces,
    ProductRelated,
    ProductNotfound,
    MenuSlide
  ],
  providers: [
    Store,
    FirebaseService,
    Wikipedia
  ]
})
export class ProductPage {

  result: any;
  productID:string;
  productData:any;
  productName:string;
  focusData:any[];
  nutriments:any;
  ingredients:any;
  additives_tags:any[]= [];
  categories_hierarchy:any;

  titleUnvisible:boolean = true;
  titleH1Unvisible:boolean = false;

  isAuth:any = false;
  email:string;

  loading:Loading;
  additives:any;
  traceAndAlergens:string[];

  @ViewChild(Content)       content       : Content;
  @ViewChild(ProductFocus)  productFocus  : ProductFocus;
  @ViewChild(ProductAdditive)  productAdditive  : ProductAdditive;
  @ViewChild(ProductAlergensTraces)  productAlergensTraces  : ProductAlergensTraces;


  constructor(
    private _st             : Store,
    private nav             : NavController,
    private params          : NavParams,
    public authData         : FirebaseService,
    private _wiki           : Wikipedia
  ) {
      //// Get data with nav parameters
      this.getData(this.params.get('id'))
      let productID = this.params.get('id');
      //// Check if user Auth == true
      if(this._st.online === true){
        this.authData = authData;
        this.authData.fireAuth.onAuthStateChanged((user) => {
          if (user) {
            this.isAuth = true
            this.email = user.email
            // save product id in history.save.list
            let database = this.authData.database.ref('historySearch/' + user.uid);
            database.once('value', function(snapshot) {
              //console.log(snapshot.val());
              if(snapshot.val() === null && productID !== 'inconnu'){
                database.child(productID).set({
                  nbr: 1,
                  time: new Date().getTime()
                }).then(() => {
                  //console.log('user historySearch Creat & product added')
                });
              }
              else {
                //console.log('user historySearch database.ref() exist.')
                if(snapshot.val()[productID] && productID !== 'inconnu'){
                  //console.log('product already exist in user history')
                  //console.log(snapshot.val()[productID].nbr)
                  database.child(productID).update({
                    nbr: snapshot.val()[productID].nbr + 1,
                    time: new Date().getTime()
                  })
                }
                else {
                  //console.log('product NOT exist in user history')
                  if(productID !== 'inconnu'){
                    database.child(productID).set({
                      nbr: 1,
                      time: new Date().getTime()
                    }).then(() => {
                      //console.log('user historySearch Creat & product added')
                    });
                  }

                }
              }
            });
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
  getData(barcode){
    this.productID = barcode;
    this._st.getProductData(barcode)
      .subscribe(
        (data) => {
          if(data.status){
            this.result = data.status
          }
          else {
            this.result = 0
          }
          if(this.result === 1){
            this.productData = data.product
          }
          else {
            /*** no result in API or no internet connection ***/
            if(data.length == 1){
              /*** if data return somthing ***/
              if(data[0].id){
                this.productData = data[0];
                this.result = 1
              }
              else {
                this.productData = false;
              }
            }
            else {
              this.productData = false;
            }
          }
        },
        (error) => this.productData = false,
        () => this.setData()
      )
  }

  setData(){
    //console.log(this.productData)
    if(this.productData != false){
      this.productName      = this.productData.product_name
      this.nutriments       = this.productData.nutriments
      this.ingredients      = this.productData.ingredients
      this.productData.additives_tags.map((data)=>{
        let add:any= this._st.getAdditiveDataEA(data.split(':')[1].slice(1))
        let item:any={};
        if(!add){
          item.id = data
          item.level = '1'
          item.obj = {name:'inconnu'}
          item.type = 'inconnu'
        }
        else {
          //console.log(this._st.getAdditiveDataEA(data.split(':')[1].slice(1)))
          item.id = data
          item.level = add.level
          item.obj = this._st.getAdditiveDataEA(data.split(':')[1].slice(1))
          item.type = add.type
        }
        this.additives_tags.push([
          item.id,
          item.level,
          item.obj,
          item.type
        ])
        //console.log(this.additives_tags)
      });


      if(this.productData.categories_hierarchy && this.productData.categories_hierarchy.length > 0){
        this.categories_hierarchy = this.productData.categories_hierarchy.reverse()[0].split(':')[1]
      }
      else {
        this.categories_hierarchy  = null
      }

      if(!this.productData.serving_size){
        this.productData.serving_size = 0
      }

      // get traces
      if(!this.productData.traces){
        this.productData.traces = ''
      }
      //console.log('traces -> ',this.productData.traces.split(","))
      // get allergens
      if(!this.productData.allergens){
        this.productData.allergens = ''
      }
      //console.log('allergens -> ', this.productData.allergens.split(","))

      // merge trace & alergens in one array
      this.traceAndAlergens = this.productData.traces.concat(this.productData.allergens).split(',')
      //console.log('allergens+trace -> ',this.traceAndAlergens)

      if(!this.productData.serving_quantity){
        this.productData.serving_quantity = 0
      }

      this.focusData    = [];
      this.focusData.push({

        sugars_100:         this.productData.nutriments.sugars_100g,
        carbohydrates_100:  this.productData.nutriments.carbohydrates_100g,
        fat_100:            this.productData.nutriments.fat_100g,
        sugar_portion:      this.productData.nutriments.sugars_serving,
        fat_portion:        this.productData.nutriments.fat_serving,
        serving_quantity:   this.productData.serving_quantity,
        serving_size:       this.productData.serving_size

      })
      //console.log(this.productData)
      //console.log(this.focusData)
      //console.log(this.additives_tags)
    }
  }
  wikiQuery(query:string){
    return this._wiki.load(query)
  }
  /** Events Methode **/
  onClickModal(e){
    //console.log(e)
    // query to wikipedia API to get definition
    let resultWiki = this.wikiQuery(e.id)
    resultWiki.then((data:any)=> {
      console.log(data)
      let addDesc = data.extract;
      let alert = Alert.create({
        title: ''+e.id+'',
        message: '<p><b>Nom:</b> '+e.name+'</p><p><b>Type:</b> '+data.description+'</p><p><b>Catégorie:</b> '+e.type+'</p><p><b>Déscription:</b> '+addDesc+'</p><p class="alertTxt '+e.level+'">'+e.txtAlert+'</p>',
        buttons: ['Ok']
      });
      this.nav.present(alert);
    })

  }
  onClickToggle(e){
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

  onClickRelated(event,id){
    let param       = event.id
    this.productID  = param;
    this.focusData    = null;
    this.getData(param)
    this.additives_tags = []
    this.loading = Loading.create({
      content: "Chargement...",
      duration: 500,
    });
    this.nav.present(this.loading);

    this.content.scrollToTop();
    //this.productFocus.calculeSugar()

    // close all accordeon
    let acc = document.getElementsByClassName('open')
    let btn = document.getElementsByClassName('rotate')
    //console.log(acc)
    for (let i = 0; i < acc.length; i++) {
        acc[i].classList.toggle("open");
        btn[i].classList.toggle("rotate");
    }
    let self = this;
    setTimeout(() =>{
      this.productFocus.animateSugar()
      this.productAdditive.loadData()
      this.productAlergensTraces.loadData();
    }, 500)
  }

  onClickAdd(){
    if(this.isAuth == true){
      if(isNaN(+this.productID) === true){
        this.nav.push(AddPage)
      }
      else {
        this.nav.push(AddPage, { id: this.productID })
      }
    }
    else {
      this.nav.push(UserPage)
    }
  }

  onClickBack(){
    this.nav.pop()
  }

  onPageScroll(event) {
      let ionNavBarToolbar = event.target.offsetParent.previousElementSibling.firstElementChild.firstElementChild;
      if(event.target.scrollTop >= 5){
          ionNavBarToolbar.classList.add('scroll')
          this.titleUnvisible = false;
          this.titleH1Unvisible = true;
      }
      else {
        if (ionNavBarToolbar.classList.contains('scroll') == true ){
          ionNavBarToolbar.classList.remove('scroll')
          this.titleUnvisible = true;
          this.titleH1Unvisible = false;
        }
      }

  }

  onClickLogin(){
    console.log('emit onClickLogin')
    this.nav.push(UserPage)
  }

  ngAfterViewInit() {
    this.content.addScrollListener((event) =>  {
        this.onPageScroll(event);
    });
  }
}
