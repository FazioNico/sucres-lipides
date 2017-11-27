/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   23-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
*/

import { NgRxAction } from '../../../store/ngrx.actions';

import { IProduct, IProductState } from "./product-detail.state";

export const ProductActions = {
  LOAD: '[Product Detail] LOAD Requested',
  LOAD_SUCCESS: '[Product Detail] LOAD Success',
  ERROR: '[Product Detail] Error'
}

export class LoadAction extends NgRxAction<any> { type = ProductActions.LOAD; }
export class LoadSuccessAction extends NgRxAction<IProductState> { type = ProductActions.LOAD_SUCCESS; }
export class ErrorAction extends NgRxAction<any> { type = ProductActions.ERROR; }

export type TProductActions =
LoadAction | LoadSuccessAction |
ErrorAction;
