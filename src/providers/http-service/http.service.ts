/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-11-2017
*/

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../app/environment/env-model";


const STORAGE_ITEM:string = 'authTokenTest';

/*
Generated class for the HttpService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export abstract class HttpService {

  private readonly apiEndPoint:string;
  private readonly _endPoint:string;
  public path:string = '';
  private storage:any;

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    this.apiEndPoint = this.envVariables.apiEndpoint + '/rest'
  }

  protected get():Observable<any>{
    // this.checkStorage(); // disabled
    // let options = this.getHeaders() // disabled
    // post request
    console.log(this.path)
    return this.http.get(`${this.path}`)
  }

  protected post(body:any):Observable<any>{
    this.checkStorage();
    let options:any = this.getHeaders();
    return this.http.post(`${this.apiEndPoint}${this.path}`, body, options)
  }

  protected put(body:any):Observable<any>{
    this.checkStorage();
    let options:any = this.getHeaders();
    let url:string = `${this.apiEndPoint}${this.path}/${body._id}`; //see mdn.io/templateliterals
    return this.http.put(url, JSON.stringify(body), options)
  }

  protected delete(_id:string):Observable<any>{
    this.checkStorage();
    let options:any = this.getHeaders();
    let url:string =`${this.apiEndPoint}${this.path}/${_id}`;
    return this.http.delete(url, options)
  }


  protected getMock(_params:any):Observable<any> {
    let datas:any[] = [
      {
        _id: 1,
        description: 'first',
        isComplete: true,
        deadline: Date.now(),
        date: Date.now()
      },
      {
        _id: 2,
        description: 'seconde',
        isComplete: false,
        deadline: Date.now(),
        date: Date.now()
      }
    ];
    return Observable.of(datas);
  }

  /* Check if localstorage exist with datas */
  checkStorage():void|Observable<any>{
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.storage = (token)?JSON.parse(token):null
    // if storage not found
    if(!this.storage){
      return Observable.of({});
    }
  }

  getHeaders(){
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.storage = (token)?JSON.parse(token):'';
    //Define Heders request
    new Headers({'cache-control': 'no-cache','x-access-token': this.storage})
    let headers:HttpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Access-Control-Allow-Origin", "*")
        .set('cache-control','no-cache')
        .set('x-access-token',this.storage)
    let options:any = { headers: headers }
    return options;
  }

}
