/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   13-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 22-07-2016
*/

import { Injectable }             from '@angular/core';
import { Storage, LocalStorage }  from 'ionic-angular';
import { Observable }             from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class LocalStorageService {

  local:Storage   = new Storage(LocalStorage);

  constructor() {

  }

  /** Get mehtode **/

  get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.local.get(key));
      } catch (e) {
        reject(e);
      }
    });
  }

  /** Set Methode **/

  set(key: string, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.local.set(key, value);
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
        this.local.remove(key);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

}
