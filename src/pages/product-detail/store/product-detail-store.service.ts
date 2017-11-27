/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   23-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
 */

 import { Injectable } from '@angular/core';
 import { Store } from '@ngrx/store';
 import { Observable } from 'rxjs/Observable';

 import { StoreService } from '../../../store/store.service';
 import { AppStateI } from '../../../store/app-stats';
 import * as product from './product-detail.actions';

 @Injectable()
 export class ProductStoreService extends StoreService {

   protected STATE = 'dataObject';

   constructor(
     protected store: Store<AppStateI>
   ) { super() }

   dispatchLoadAction(params:{path:string}):void{
     this.dispatchAction(new product.LoadAction(params));
   }

   // prevent error implementation of unused methodes
   dispatchCreateAction(record: any):void{}
   dispatchUpdateAction(record:any):void{}
   dispatchRemoveAction(id:string|number):void{}


   getDataItem():any {
     return this.storeSelectFeatureState()
     .map((state: any) => state);
   }
 }
