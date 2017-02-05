/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, NavParams, Content, LoadingController, AlertController } from 'ionic-angular';

import { ProductFocusComponent }                       from '../../components/product-focus/product-focus';
import { ProductAdditiveComponent }                    from '../../components/product-additive/product-additive';
//import { ProductRelatedComponent }                     from '../../components/product-related/product-related';
import { ProductAlergensTracesComponent }              from "../../components/product-alergens-traces/product-alergens-traces";

import { StoreService }                              from '../../providers/store/store';
import { FirebaseService }                    from '../../providers/firebase/firebase';
import { WikipediaService }                          from "../../providers/wikipedia/wikipedia";
import { RoutesService } from '../../providers/routes/routes';

/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
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
  user:any;
  email:string;

  loader:any
  additives:any;
  traceAndAlergens:string[];

  @ViewChild(Content) content: Content;
  @ViewChild(ProductFocusComponent) productFocus: ProductFocusComponent;
  @ViewChild(ProductAdditiveComponent) productAdditive: ProductAdditiveComponent;
  @ViewChild(ProductAlergensTracesComponent) productAlergensTraces: ProductAlergensTracesComponent;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private _st: StoreService,
    public authData: FirebaseService,
    private _wiki: WikipediaService,
    private _ngZone: NgZone
  ) {

      //// Check if user Auth === true
      this.userIsAuth()

      // Search product by ID (data coming from scan plugin)
      if(this.params.get('search')){
        if(isNaN(+this.params.get('search'))){
          console.log('search id isNaN')
          this.result = 0;
          return;
        }
        this.searchDataById(this.params.get('search'))
        return
      }

      //// Get product data with nav parameters
      let product = this.params.get('product');
      if(!product){
        console.log('product not exist', this.params.get('notFound'))
        this.productID = this.params.get('notFound')
        this.result = 0;
        return
      }
      if(isNaN(+product._id)){
        console.log('id isNaN')
        this.productID = this.params.get('notFound')
        this.result = 0;
        return;
      }

      this.result = 1;
      this.productData = product;
      this.setData()
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductPage');
  }

  /** Core Methode **/
  setData(){
    if(this.productData === false || !this.productData || !this.productData._id){
      return
    }
    //console.log('setData() -> ', this.productData)
    let additives_tags = [];
    if(this.productData.additives_tags){
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

      additives_tags.push([
        item.id,
        item.level,
        item.obj,
        item.type
      ])
      //console.log(this.additives_tags)
      this.productData.additives_tags = additives_tags
    });
    }


    if(this.productData.categories_hierarchy && this.productData.categories_hierarchy.length > 0){
      this.categories_hierarchy = this.productData.categories_hierarchy.reverse()[0].split(':')[1]
    }
    else {
      this.categories_hierarchy  = null
    }
    // get traces
    if(!this.productData.traces){
      this.productData.traces = ''
    }
    // get allergens
    if(!this.productData.allergens){
      this.productData.allergens = ''
    }
    // merge trace & alergens in one array
    this.productData.traceAndAlergens = [this.productData.traces, ...this.productData.allergens.split(',')]

    this.focusData = [{
      sugars_100:         this.productData.nutriments.sugars_100g,
      carbohydrates_100:  this.productData.nutriments.carbohydrates_100g,
      fat_100:            this.productData.nutriments.fat_100g,
      sugar_portion:      this.productData.nutriments.sugars_serving,
      fat_portion:        this.productData.nutriments.fat_serving,
      serving_quantity:   (this.productData.serving_quantity)?this.productData.serving_quantity : 0,
      serving_size:       (this.productData.serving_size)?this.productData.serving_size : 0
    }]

  }

  searchDataById(barcode:number):void{
    this._st.getProductData(barcode)
      .subscribe(
        (data:any) => {
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

  wikiQuery(query:string){
    return this._wiki.load(query)
  }

  userIsAuth(){
    if(this._st.online === true){
      //this.authData = authData;
      this.authData.fireAuth.onAuthStateChanged((user) => {
        if (!user) {
            return;
        }
        this.isAuth = true
        this.user = user
        this.email = user.email
        console.log('userIsAuth user-> ',this.user)
        if(this.productData){
          this.saveInHistory()
        }
      });
    }
    //console.log('user isAuth->', this.isAuth)
  }

  saveInHistory(){
    console.log('saveInHistory->', this.productData);
    // save product id in history.save.list
    let database = this.authData.database.ref('historySearch/' + this.user.uid);
    database.once('value', (snapshot)=> {
      if(!this.productData){
        return;
      }
      if(snapshot.val() === null && this.productData){
        //console.log('new this.productData->', this.productData);
        database.child(this.productData._id).set({
          nbr: 1,
          time: new Date().getTime()
        }).then(() => {
          console.log('user historySearch Creat & product added')
        });
      }
      else {
        console.log('user historySearch database.ref() exist.')
        if(snapshot.val()[this.productData._id] && this.productData._id){
          //console.log('product already exist in user history')
          //console.log(snapshot.val()[productID].nbr)
          database.child(this.productData._id).update({
            nbr: snapshot.val()[this.productData._id].nbr + 1,
            time: new Date().getTime()
          })
        }
        else {
          console.log('product NOT exist in user history')
          if(this.productData._id){
            database.child(this.productData._id).set({
              nbr: 1,
              time: new Date().getTime()
            }).then(() => {
              console.log('user historySearch Creat & product added')
            });
          }

        }
      }
    });
  }
  /** Events Methode **/
  onClickModal(e){
    //console.log(e)
    // query to wikipedia API to get definition

    let resultWiki = this.wikiQuery(e.id)
    resultWiki.then((wikiData:any)=> {
      //then open alert
      let alert = this.alertCtrl.create({
        title: e.id,
        message: `
          <p><b>Nom:</b> ${e.name}</p>
          <p><b>Type:</b> ${wikiData.description}</p>
          <p><b>Catégorie:</b> ${e.type}</p>
          <p><b>Déscription:</b> ${wikiData.extract}</p>
          <p class="alertTxt ${e.level}">${e.txtAlert}</p>
        `,
        buttons: ['Ok']
      });
      alert.present();
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
    //this.getData(param)
    this.additives_tags = []
    this.loader = this.loadCtrl.create({
      content: "Chargement...",
      duration: 500,
    });
    this.loader.present();

    this.content.scrollToTop();

    // close all accordeon
    let acc = document.getElementsByClassName('open')
    let btn = document.getElementsByClassName('rotate')
    //console.log(acc)
    for (let i = 0; i < acc.length; i++) {
        acc[i].classList.toggle("open");
        btn[i].classList.toggle("rotate");
    }
    setTimeout(() =>{
      // this.productFocus.animateSugar()
      // this.productAdditive.loadData()
      // this.productAlergensTraces.loadData();
    }, 500)
  }

  onClickAdd(){
    //console.log('onClickAdd->', this.productID, this.isAuth)
    if(this.isAuth === true){
      if(isNaN(+this.productID) === true){
        this.navCtrl.push(RoutesService.getPage(RoutesService.ADD))
      }
      else {
        this.navCtrl.push(RoutesService.getPage(RoutesService.ADD), { id: this.productID })
      }
    }
    else {
      this.navCtrl.push(RoutesService.getPage(RoutesService.USER))
    }
  }

  onClickBack(){
    this.navCtrl.pop()
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

  onClickLogin(){
    console.log('emit onClickLogin')
    //this.navCtrl.push(UserPage)
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((data)=>{
      //console.log('event->', data)
      this.onPageScroll(event);
    })
  }
}
