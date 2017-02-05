/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Camera } from 'ionic-native';

//import { ApiService }       from '../../providers/api-service/api-service';
import { StoreService } from '../../providers/store/store';
import { FirebaseService }from '../../providers/firebase/firebase';
/*
  Generated class for the Add page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  myForm:any;
  base64Image:any;
  file:any;
  loader:any;
  productAdded:boolean = false;

  @ViewChild(Content) content : Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private _st: StoreService,
    private formBuilder : FormBuilder,
    public authData: FirebaseService
  ) {

    // Building Angular Form Validators
    let inputBarcode:any =  ["", Validators.minLength(4)];
    this.myForm = this.formBuilder.group({
      code:inputBarcode,
      product_name:      ["", Validators.required],
      quantity:          ["", Validators.required],
      ingredients_text:  ["", Validators.required],
      nutriment_energy:        ["", Validators.required],
      nutriment_proteins:      ["", Validators.required],
      nutriment_fat:           ["", Validators.required],
      nutriment_fat_sat:       [""],
      nutriment_carbohydrates: ["", Validators.required],
      nutriment_sugars:        [""],
      nutriment_fiber:         ["", Validators.required],
      nutriment_salt:          ["", Validators.required]
    });
  }

  /** Event Methode ***/
  onAdd(){
    this.loader = this.loadingCtrl.create({
      content: "Chargement..."
    });
    this.loader.present()
    .then(() => {
      this.submitProduct()
    });
  }

  onClickToggle(e){
    let el = e.target.closest(".acc-item > h3")
    el.nextElementSibling.classList.toggle("open");
    el.children[0].classList.toggle("rotate")
  }

  onbackToSearch(){
    this.navCtrl.popToRoot()
  }

  onInutFileChange(event,uploadFile){
    //console.log(event)
    let file    = event.target.files[0];
    let reader  = new FileReader();
    reader.addEventListener("load", () =>{
      this.file = reader.result;
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
    //uploadFile.value = event.target.value;
  }

  selectFile($event): void {
		var inputValue = $event.target;
		if( null == inputValue || null == inputValue.files[0]){
			console.debug("Input file error.");
			return;
		}else {
			this.file = inputValue.files[0];
			//console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
		}
	}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddPage');
    let ionHeader = this.content.getElementRef().nativeElement.previousElementSibling
    ionHeader.classList.add('scroll')
  }

  ngAfterViewInit() {

  }

  /*** Core Methode ***/
  dataURItoBlob(dataURI) {
      let byteString = window.atob(dataURI);
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      let blob = new Blob([ia], { type: '"image/jpeg"' });
      return blob;
  }

  getPicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth:  400,
      targetHeight: 400
    })
    .then(
      (imageData) => {
        //console.info(imageData)
        if (imageData) {
          this.base64Image = "data:image/jpeg;base64," + imageData;
          this.file = this.dataURItoBlob(imageData);
          //console.info('fichier create', this.file)
        }
      },
      (error) => {
        console.log("Error:"+error)
      }
    )
  }

  private submitProduct(){
    if(this.myForm.status == 'VALID'){
      //console.info('Form valid -> ready to submitted ->', this.myForm);
      let dataReady:any             = this.myForm.value // {}
      dataReady.lang                = 'fr';

      /*** save with api **/
      this._st.savedata(this.SerializeParams(dataReady))
      setTimeout(()=>{
        //console.info('product  added now ready to add img product')
        this.productAdded = true;
        this._st.saveImg(this.file, dataReady.code);
        this.saveProductIDinFB(dataReady.code)
        this.hideLoading();
      },5000)
      /** **/
    }
    else {
      this.hideLoading()
      console.log('Form.value-> ',this.myForm.value)
      // let alert = Alert.create({
      //   title: 'Erreur de formulaire',
      //   message: "Tu as oublié quelques champs d'informations indispensable pour l'ajout d'un nouveau produit",
      //   buttons: ['Ok']
      // });
      // this.navCtrl.present(alert);
    }
  }

  private saveProductIDinFB(barcode){

  }

  private hideLoading(){
    this.loader.dismiss();
  }

  private SerializeParams<T>(Data: T): string|number {
     let keys:any = Object.keys(Data);
     let stringParams: string = "?";
     for (let i in keys) {
         let name = keys[i];
         if(Data[name].length >= 1){
           if (i == '0')
               stringParams += name + "=" + Data[name];
           else
               stringParams += "&" + name + "=" + Data[name]
         }
     }
     return stringParams;
  };
}
