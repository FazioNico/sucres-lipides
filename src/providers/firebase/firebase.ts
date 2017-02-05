/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 02-02-2017
*/

import { Injectable } from '@angular/core';
//import { Observable }           from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';
import * as firebase            from 'firebase';
/*
  Generated class for the Firebase provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {

  fireAuth:     any;
  database:     any;
  userProfile:  any;

  constructor(
    public alertCtrl: AlertController
  ) {
    if(navigator.onLine === true){
      this.fireAuth     = firebase.auth();
      this.database     = firebase.database();
      this.userProfile  = firebase.database().ref('/userProfile');
    }
  }

  loginUserFB(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
    .then((authData)=>{
          //console.log(authData)
          //let localStorage = loc
          //localStorage.setItem('uid', authData.uid);
          //localStorage.setItem('refreshToken', authData.refreshToken);
    });
  }

  signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: email
        }).then(() => {
          console.log('user Creat & loged')
        });

      })
    }, (error) => {
      var errorMessage: string = error.message;
      let prompt = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{text: "Ok"}]
      });
      prompt.present();
    });
  }


  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email).then((user) => {
      let prompt = this.alertCtrl.create({
        message: "We just sent you a reset link to your email",
        buttons: [{text: "Ok"}]
      });
      prompt.present();

    }, (error) => {
      var errorMessage: string;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "You'll need to write a valid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "That user does not exist";
          break;
        default:
          errorMessage = error.message;
      }

      let prompt = this.alertCtrl.create({
        message: errorMessage,
        buttons: [{text: "Ok"}]
      });

      prompt.present();
    });
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }

}
