/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-10-2017
*/

import { AuthActions, TAuthActions } from '../../pages/login/store/auth.actions';
import { ErrorActions, TErrorActions } from '../actions/err.actions';
import { ItemsActions, TItemsActions } from "../../pages/items/store/items.actions";

export interface IErrorState extends String {};
export const intitialState:IErrorState|null = null

export function reducer (
  state:IErrorState|null = intitialState,
  action:TErrorActions|TItemsActions|TAuthActions
):IErrorState | null{
  //console.log('ERROR REDUCER-> ', action);
  switch (action.type) {
    case ItemsActions.ERROR: {
      return Object.assign({},action.payload )
    }

    case AuthActions.ERROR: {
      console.log('action.payload->', action.payload)
      return Object.assign(action.payload )
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
