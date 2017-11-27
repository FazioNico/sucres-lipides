/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
*/

import { SearchActions, TSearchActions } from "../../pages/search/store/search.actions";
import { ProductActions, TProductActions } from "../../pages/product-detail/store/product-detail.actions";
import { ErrorActions, ErrorAction } from '../actions/err.actions';

export interface ILoadedState extends Boolean {};
export const intitialState:ILoadedState = true;

export function reducer (
  state:ILoadedState = intitialState,
  action:TSearchActions | TProductActions
):ILoadedState {
  switch (action.type) {
    case SearchActions.LOAD: {
      return false
    }
    case SearchActions.LOAD_SUCCESS: {
      return true
    }
    case SearchActions.ERROR: {
      return false
    }

    case ProductActions.LOAD: {
      return false
    }
    case ProductActions.LOAD_SUCCESS: {
      return true
    }
    default: {
      return <ILoadedState>state;
    }
  }
};
