/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
*/

import { SearchActions, TSearchActions } from "../../pages/search/store/search.actions";
import { ErrorActions, ErrorAction } from '../actions/err.actions';
import { ProductActions, TProductActions } from "../../pages/product-detail/store/product-detail.actions";

export interface ILoadingState extends Boolean {};
export const intitialState:ILoadingState = false

export function reducer (
  state:ILoadingState = intitialState,
  action:ErrorAction|TSearchActions|TProductActions
):ILoadingState {
  switch (action.type) {

    case SearchActions.LOAD: {
      return true
    }
    case SearchActions.LOAD_SUCCESS: {
      return false
    }
    case SearchActions.ERROR: {
      return false
    }

    case ProductActions.LOAD: {
      return true
    }
    case ProductActions.LOAD_SUCCESS: {
      return false
    }

    case ErrorActions.ERROR_DISPLAY: {
      return false
    }

    default: {
      return <ILoadingState>state;
    }
  }
};
