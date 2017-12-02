/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-12-2017
*/

import { ErrorActions, TErrorActions } from '../actions/err.actions';
import { SearchActions, TSearchActions } from "../../pages/search/store/search.actions";
import { ProductActions, TProductActions } from "../../pages/product-detail/store/product-detail.actions";

export interface IErrorState extends String {};
export const intitialState:IErrorState|null = null

export function reducer (
  state:IErrorState|null = intitialState,
  action:TErrorActions | TSearchActions | TProductActions
):IErrorState | null{
  switch (action.type) {

    case SearchActions.ERROR: {
      return Object.assign({},action.payload )
    }

    case ProductActions.ERROR: {
      return Object.assign({},action.payload )
    }

    case ErrorActions.ERROR_DISPLAY_SUCCESS: {
        console.log('intitialState->', intitialState)
      return intitialState
    }

    default: {
      return <IErrorState>state;
    }
  }
};
