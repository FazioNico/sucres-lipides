/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   23-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
 */
 import { Injectable, Inject } from '@angular/core';
 import { HttpClient } from '@angular/common/http';

 import {Observable} from 'rxjs/Observable';

 import { HttpService } from "../../providers/http-service/http.service";
 import { OffApiService } from "../../providers/off-api-service/off-api.service";
 import { EnvVariables } from '../../app/environment/environment.token';
 import { IEnvironment } from "../../app/environment/env-model";


 @Injectable()
 export class ProductService extends OffApiService {


   constructor(
     public http: HttpClient,
     @Inject(EnvVariables) public readonly envVariables:IEnvironment
   ) {
     super(http,envVariables);
   }

 }
