/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 04-02-2017
*/

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';

//import { RoutesService }          from '../../providers/routes/routes';
import { FirebaseService } from '../../providers/firebase/firebase';

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  public loginForm: any;
  public loader:any;
  public isAuth:boolean;
  public email:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authData : FirebaseService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) {
    // set the form with Angular FormBuilder
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
    });

    if(navigator.onLine === true){
      this.authData = authData;
      this.authData.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          // If there's a user take him to the home page.
          this.isAuth = true
          this.email = this.capitalise(user.email.split('@')[0])
        } else {
          // If there's no user logged in send him to the LoginPage
          this.isAuth = false
        }
      });
    }
    else {
      // If there's no user logged in send him to the LoginPage
      this.isAuth = false
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserPage');
  }

  capitalise(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  loginUser(){
    console.log('login value->',this.loginForm.value)
    if(!this.loginForm.value.email && !this.loginForm.value.password){
      this.showError("Tous les champs sont obligatoires",false)
      return;
    }
    this.loader = this.loadingCtrl.create({
    });
    this.loader.present();

    this.authData.loginUserFB(this.loginForm.value.email, this.loginForm.value.password)
    .then((authData) => {
      this.loader.dismiss();
      console.log('loged')
    }
    , (error) => {
        this.showError(error.message)
    });

  }

  goToSignup(value){
    if(!value.email && !value.password){
      this.showError("Tous les champs sont obligatoires",false)
      return;
    }
    this.loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loader.present();

    this.authData.signupUser(value.email, value.password)
      .then((data) => {
        this.loader.dismiss();
      })
  }

  goToResetPassword(){
    //this.nav.push(ResetPasswordPage);
  }

  gologout(){
    this.authData.logoutUser();
    this.isAuth = false
  }

  showError(text:string,hideLoading:boolean=true) {
    if (hideLoading === true){
      //setTimeout(() => {
      if(this.loader){
        this.loader.dismiss();
      }

      //});
    }
    let prompt = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }
}
