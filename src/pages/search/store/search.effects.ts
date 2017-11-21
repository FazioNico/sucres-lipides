/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
 */


  import { Injectable } from "@angular/core";
  import { Observable } from 'rxjs/Observable';
  import { Action } from '@ngrx/store';
  import { Effect, Actions, toPayload } from "@ngrx/effects";

  import * as Search from "./search.actions";
  import { SearchService } from "../search.service";

  @Injectable()
 export class SearchEffects {

   constructor(
     private action$: Actions,
     private _database: SearchService
   ) {
   }

   @Effect() loadAction$ = this.action$
       .ofType(Search.SearchActions.LOAD)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => this._database.find(payload))
       .switchMap(result=> Observable.of(new Search.LoadSuccessAction(result)))
       .catch(err => Observable.of(new Search.ErrorAction(err)))
}
