import { Injectable }   from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams
}                       from '@angular/http';

import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class ApiService {

    urlProtocole:string   = 'http://';
    ndd:string            = 'openfoodfacts.org'
    country:string        = 'world.';
    ch:string             = 'ch-fr.';
    cgiUrl:string         = '/cgi/search.pl?search_terms=';
    apiUrl: string        = '/api/v0'
    product: string       = '/product/'
    categorie: string     = '/category/'
    format:string         = '&search_simple=1&json=1';
    parmUrl:string;

    postUrlProduct:string     = 'http://world.openfoodfacts.org/cgi/product_jqm2.pl';
    postUrlProductTest:string = 'http://world.openfoodfacts.net/cgi/product_jqm2.pl';
    postImgProduct: string    = 'http://world.openfoodfacts.org/cgi/product_image_upload.pl';
    postImgProductTest: string    = 'http://world.openfoodfacts.net/cgi/product_image_upload.pl';

    //user:string           = 'fazio';
    //password:string       = 'OFF2663000?_';
    user:string           = 'off';
    password:string       = 'off';

    constructor(
      public http : Http
    ) {
    }

    /*** Get Methode ***/

    getData(value){
      this.parmUrl = value;
      let queryUrl = this.urlProtocole + this.country+ this.ndd  + this.cgiUrl + this.parmUrl + this.format;
      return this.http.get(queryUrl)
        .map(res => res.json())
    }

    getProductData(value){
      this.parmUrl = value.toLowerCase();
      let queryUrl = this.urlProtocole + this.country+ this.ndd  + this.apiUrl + this.product + this.parmUrl + '.json';
      return this.http.get(queryUrl)
        .map(res => res.json())
    }

    getCategorieData(value){
      this.parmUrl = value;
      let queryUrl = this.urlProtocole + this.country+ this.ndd  + this.categorie + this.parmUrl + '.json';
      return this.http.get(queryUrl)
        .map(res => res.json())
    }

    /*** Save Methode ***/

    save(product)   {
      console.log('save befor server')
      return this.postData(product)
      .subscribe((data)=> {
        console.log(data)
      });
    }

    /**
    * function working but retune 'Acces-Control-Allow-Origin'
    * => need suport
    **/
    private postData(productDataURI: string): Observable<any> {
      //productDataURI += '&user_id=' + this.user + '&password=' + this.password;
      return this.http
                .get(this.postUrlProduct+productDataURI)
                .map(res => res.json())
    }

    /** test to post image product to API **/
    postImg(img,barcode){
      let formData = new FormData();
      formData.append("code",  barcode);
      formData.append("imagefield",  'front');
      formData.append("imgupload_front",  img);
      let headers = new Headers({'Content-Type': 'multipart/form-data'})
      let options = new RequestOptions({headers: headers})
      this.http.post(this.postImgProduct, formData, options)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleErrorProm);
    }
    /***
    * But test not working.. dont'know how to get image from input
    * and send to api as  multipart/form-data format =>  need suport
    ***/

    private handleErrorProm(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
    }

}
