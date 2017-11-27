/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   23-11-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 23-11-2017
 */

 import { ProductActions, TProductActions } from './product-detail.actions';
 import { IProduct, IProductState, intitialState } from "./product-detail.state";

 export function reducer (
   state:IProductState = intitialState,
   action:TProductActions
 ):IProductState {
   switch (action.type) {
     case ProductActions.LOAD: {
       return Object.assign({}, state)
     }
     case ProductActions.LOAD_SUCCESS: {
       //return adapter.addMany(action.payload, state)
       console.log('XXXXXXX->',Object.assign({}, action.payload.product))
       return Object.assign({}, action.payload.product)
     }
     case 'CLEAR': {
       //return adapter.addMany(action.payload, state)
       return Object.assign({}, intitialState)
     }
     // case ProductActions.CLEAR: {
     //   //return adapter.addMany(action.payload, state)
     //   return Object.assign({}, intitialState)
     // }
     // case 'CLEAR': {
     //   //return adapter.addMany(action.payload, state)
     //   return Object.assign({}, intitialState)
     // }

     default: {
       return <IProductState>state;
     }
   }
 };
