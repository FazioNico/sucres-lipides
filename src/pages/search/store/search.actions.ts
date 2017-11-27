/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
 */

import { NgRxAction } from '../../../store/ngrx.actions';

import { ISearch, ISearchState } from "./search.state";

export const SearchActions = {
  LOAD: '[Search] LOAD Requested',
  LOAD_SUCCESS: '[Search] LOAD Success',
  FIND_BY_ID: '[Search] FIND_BY_ID Requested',
  FIND_BY_ID_SUCCESS: '[Search] FIND_BY_ID Success',
  CLEAR: '[Search] CLEAR Requested',
  ERROR: '[Search] Error'
}

export class LoadAction extends NgRxAction<any> { type = SearchActions.LOAD; }
export class LoadSuccessAction extends NgRxAction<ISearchState> { type = SearchActions.LOAD_SUCCESS; }
export class FindByIdAction extends NgRxAction<any> { type = SearchActions.FIND_BY_ID; }
export class FindByIdSuccessAction extends NgRxAction<ISearchState> { type = SearchActions.FIND_BY_ID_SUCCESS; }
export class ClearAction extends NgRxAction<any> { type = SearchActions.CLEAR; }
export class ErrorAction extends NgRxAction<any> { type = SearchActions.ERROR; }

export type TSearchActions =
LoadAction | LoadSuccessAction | ErrorAction;
