/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
*/

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import { HttpService } from "../../providers/http-service/http.service";
import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../app/environment/env-model";


@Injectable()
export class SearchService extends HttpService {

  private readonly _endpoint:any = {
    base: 'https://fr-en.openfoodfacts.org/api/v0/',
    query: 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=',
    queryOption: '&search_simple=1&json=1',
    product: 'product'
  };

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) public readonly envVariables:IEnvironment
  ) {
    super(http,envVariables);
  }

  find(data){
    this.path = this._endpoint.query + data.path + this._endpoint.queryOption//+ '&user_id=fazio&password=OFF2663000?_'
    return this.get()
  }

}
