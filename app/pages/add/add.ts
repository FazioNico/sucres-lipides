/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   12-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-07-2016
*/

import { Component }        from '@angular/core';
import { ViewChild }        from '@angular/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  Validators,
  AbstractControl,
  ControlGroup
}                           from '@angular/common';
import {
  NavController,
  NavParams ,
  Content,
  Loading,
  Alert
}                           from 'ionic-angular';
import { Camera }           from 'ionic-native';

//import { ApiService }       from '../../providers/api-service/api-service';
import { Store }            from '../../providers/store/store';
import { HeaderContent }    from '../../components/header-content/header-content';

/*
  Generated class for the AddPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/add/add.html',
  directives: [
    HeaderContent,
    FORM_DIRECTIVES
  ],
  providers: [
    Store
  ]
})
export class AddPage {

  myForm: ControlGroup;
  barcode:string;
  base64Image: any     = null;
  product:any          = null;
  productAdded:boolean = false;
 	idtest:string = '8765432123456789';
 	file: any;
  loading:Loading;

  @ViewChild(Content) content : Content;

  constructor(
    private   nav         : NavController,
    private   _st         : Store,
    private   fb          : FormBuilder,
    private   params      : NavParams
  ) {
    // if get nav params => set input barcode value
    let inputBarcode:any =  ["", Validators.minLength(4)];
    if(this.params.get('id')){
      this.barcode = this.params.get('id');
      inputBarcode = this.barcode
    }
    // Set Form ControlGroup
    this.myForm = fb.group({
      barcode:      inputBarcode,
      name:         ["", Validators.required],
      quantity:     ["", Validators.required],
      ingredients:  ["", Validators.required],
      nutriments: fb.group({
          energy:     ["", Validators.required],
          proteins:   ["", Validators.required],
          fat:        ["", Validators.required],
          fat_sat:    [""],
          sugar:      ["", Validators.required],
          sugar_sat:  [""],
          fiber:      ["", Validators.required],
          salt:       ["", Validators.required],
      })
    });
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

  submitProduct(){
    //console.log('Form test -> ', this.myForm);
    if(this.myForm.status == 'VALID'){
      //console.info('Form valid -> ready to submitted ->', this.myForm);
      this.product                  = this.myForm.value
      let dataReady:any             = {}
      dataReady.code                = this.product.barcode
      dataReady.product_name        = this.product.name
      dataReady.quantity            = this.product.quantity
      dataReady.nutriment_energy    = this.product.nutriments.energy
      dataReady.nutriment_fat       = this.product.nutriments.fat
      dataReady.nutriment_fat_sat   = this.product.nutriments.fat_sat
      dataReady.nutriment_carbohydrates     = this.product.nutriments.sugar
      dataReady.nutriment_sugars = this.product.nutriments.sugar_sat
      dataReady.nutriment_fiber     = this.product.nutriments.fiber
      dataReady.nutriment_proteins  = this.product.nutriments.proteins
      dataReady.nutriment_salt      = this.product.nutriments.salt
      dataReady.ingredients_text    = this.product.ingredients
      dataReady.lang                = 'fr';

      /*** save with api **/
      this._st.savedata(this.SerializeParams(dataReady))
      setTimeout(()=>{
        //console.info('product  added now ready to add img product')
        this.productAdded = true;
        let resultPostImg = this._st.saveImg(this.file, this.barcode);
        this.hideLoading();
      },5000)
      /** **/
    }
    else {
      this.hideLoading()
      let alert = Alert.create({
        title: 'Erreur de formulaire',
        message: "Tu as oublié quelques champs d'informations indispensable pour l'ajout d'un nouveau produit",
        buttons: ['Ok']
      });
      this.nav.present(alert);
    }
  }

  SerializeParams<T>(Data: T): string|number {
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

  private hideLoading(){
    this.loading.dismiss();
  }

  /** Event Methode ***/
  onAdd(){
    this.loading = Loading.create({
      content: "Chargement..."
    });
    this.nav.present(this.loading)
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
    this.nav.popToRoot()
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

  ngAfterViewInit() {
    let ionHeader = this.content.getElementRef().nativeElement.previousElementSibling
    ionHeader.classList.add('scroll')
  }

}
