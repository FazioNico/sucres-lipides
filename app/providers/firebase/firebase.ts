/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 26-07-2016
*/

import { Injectable }           from '@angular/core';
import { Http }                 from '@angular/http';
import { Observable }           from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { NavController, Alert, Storage, LocalStorage } from 'ionic-angular';
import * as firebase            from 'firebase';

@Injectable()
export class FirebaseService {

    fireAuth:     any;
    database:     any;
    userProfile:  any;

    constructor(public nav: NavController) {
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
            let localStorage = new Storage(LocalStorage)
            localStorage.set('uid', authData.uid);
            localStorage.set('refreshToken', authData.refreshToken);
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
        let prompt = Alert.create({
            message: errorMessage,
            buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
      });
    }


    resetPassword(email: string): any {
      return this.fireAuth.sendPasswordResetEmail(email).then((user) => {
        let prompt = Alert.create({
          message: "We just sent you a reset link to your email",
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);

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

        let prompt = Alert.create({
          message: errorMessage,
          buttons: [{text: "Ok"}]
        });

        this.nav.present(prompt);
      });
    }

    logoutUser(): any {
      return this.fireAuth.signOut();
    }

}
