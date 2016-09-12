import { Injectable}         from '@angular/core';

import { HomePage }           from '../../pages/home/home';
import { SearchPage }         from '../../pages/search/search';
import { ProductPage }        from '../../pages/product/product';
import { AddPage }            from '../../pages/add/add';

import { UserPage }           from '../../pages/user/user.ts';
import { AboutPage }          from '../../pages/about/about';
import { HistoryPage }        from '../../pages/history/history';
//import { FirebaseService }   from '../firebase/firebase';

@Injectable()
export class Routes {

  routes:Object               = {}
  HOME: string                = "home"
  SEARCH: string              = "search"
  PRODUCT: string             = "product"
  ADD: string                 = "add"
  USER: string                = "user"
  ABOUT: string               = "about"
  HISTORY: string             = "history"

  constructor(
    //private auth:FirebaseService
  ){

    this.routes[this.HOME]    = HomePage
    this.routes[this.SEARCH]  = SearchPage
    this.routes[this.PRODUCT] = ProductPage
    this.routes[this.ADD]     = AddPage
    this.routes[this.USER]    = UserPage
    this.routes[this.ABOUT]   = AboutPage
    this.routes[this.HISTORY] = HistoryPage

  }

  getPage(id){
    let   route = this.routes[id]
/*
    if(id == 'add'){
      this.auth.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          // If there's a user take him to the home page.
          route = this.routes[id]
        } else {
          // If there's no user logged in send him to the LoginPage
          route = this.routes[this.USER]
        }
      })
    }
*/
    return  route
  }

  getRootPage(){
    //let   root = (this.auth.authenticated()) ? this.getPage(this.TABS) : this.getPage(this.HOME)
    let     root = this.getPage(this.HOME)
    return  root
  }

}
