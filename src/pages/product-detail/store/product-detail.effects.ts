/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   23-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
 */


   import { Injectable } from "@angular/core";
   import { Observable } from 'rxjs/Observable';
   import { Action } from '@ngrx/store';
   import { Effect, Actions, toPayload } from "@ngrx/effects";

   import * as Product from "./product-detail.actions";
   import { ProductService } from "../product-detail.service";

   @Injectable()
  export class ProductEffects {

    constructor(
      private action$: Actions,
      private _database: ProductService
    ) {
    }

    @Effect() loadAction$ = this.action$
        .ofType(Product.ProductActions.LOAD)
        .map<Action, any>(toPayload)
        .switchMap((payload:any) => this._database.findByID(payload))
        .switchMap(result=> Observable.of(new Product.LoadSuccessAction(result)))
        .catch(err => Observable.of(new Product.ErrorAction(err)))
 }
