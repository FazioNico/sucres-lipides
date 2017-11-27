/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
*/

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StoreService } from '../../../store/store.service';
import { AppStateI } from '../../../store/app-stats';
import * as search from './search.actions';

@Injectable()
export class SearchStoreService extends StoreService {

  protected STATE = 'datasArray';

  constructor(
    protected store: Store<AppStateI>
  ) { super() }

  dispatchLoadAction(params:{path:string}):void{
    this.dispatchAction(new search.LoadAction(params));
  }
  dispatchFindByIdAction(params:string):void{
    this.dispatchAction(new search.FindByIdAction(params));
  }
  dispatchClearAction():void{
    this.dispatchAction(new search.ClearAction());
  }

  // prevent error implementation of unused methodes
  dispatchCreateAction(record: any):void{}
  dispatchUpdateAction(record:any):void{}
  dispatchRemoveAction(id:string|number):void{}

  getDatas():Observable<any> {
    return this.storeSelectFeatureState()
    .map((state: any) => state);
  }

  getDataById(id):Observable<any> {
    return this.storeSelectFeatureState()
    .map((state: any) => state.find(p => p.id === id));
  }
}
