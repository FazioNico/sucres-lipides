/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 02-02-2017
*/

import { Injectable } from '@angular/core';
//import { NativeStorage } from 'ionic-native';

/*
  Generated class for the LocalStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalStorageService {

  //local:any   = NativeStorage || localStorage;
  local:any   = localStorage;

  constructor() {
    console.log('Hello LocalStorage Provider');
  }

  /** Get mehtode **/

  get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.local.getItem(key));
      } catch (e) {
        reject(e);
      }
    });
  }

  /** Set Methode **/

  set(key: string, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.local.setItem(key, value);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  /*** Remove Method ***/

  remove(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.local.removeItem(key);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

}
