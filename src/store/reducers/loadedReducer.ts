/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
*/

import { SearchActions, TSearchActions } from "../../pages/search/store/search.actions";
import { ErrorActions, ErrorAction } from '../actions/err.actions';

export interface ILoadedState extends Boolean {};
export const intitialState:ILoadedState = false;

export function reducer (
  state:ILoadedState = intitialState,
  action:TSearchActions
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

    default: {
      return <ILoadedState>state;
    }
  }
};
