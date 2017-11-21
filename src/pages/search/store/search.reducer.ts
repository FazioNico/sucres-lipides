/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   21-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-11-2017
 */

 import { SearchActions, TSearchActions } from './search.actions';
 import { ISearch, ISearchState, intitialState } from "./search.state";

 export function reducer (
   state:ISearchState = intitialState,
   action:TSearchActions
 ):ISearchState {
   switch (action.type) {
     case SearchActions.LOAD: {
       return Object.assign([], state)
     }
     case SearchActions.LOAD_SUCCESS: {
       //return adapter.addMany(action.payload, state)
       return Object.assign([], [...action.payload.products])
     }

     case SearchActions.CLEAR: {
       //return adapter.addMany(action.payload, state)
       return Object.assign([], intitialState)
     }
     case 'CLEAR': {
       //return adapter.addMany(action.payload, state)
       return Object.assign([], intitialState)
     }
     
     default: {
       return <ISearchState>state;
     }
   }
 };
