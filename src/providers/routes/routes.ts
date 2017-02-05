/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 01-02-2017
*/

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


import { AboutPage } from '../../pages/about/about';
import { AddPage } from '../../pages/add/add';
import { HistoryPage } from '../../pages/history/history';
import { HomePage } from '../../pages/home/home';
import { ProductPage } from '../../pages/product/product';
import { SearchPage } from '../../pages/search/search';
import { UserPage } from '../../pages/user/user';

/*
  Generated class for the Routes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RoutesService {

  static routes:Object               = {}
  static HOME: string                = "home"
  static SEARCH: string              = "search"
  static PRODUCT: string             = "product"
  static ADD: string                 = "add"
  static USER: string                = "user"
  static ABOUT: string               = "about"
  static HISTORY: string             = "history"

  static pages = {
    [RoutesService.HOME]    : HomePage,
    [RoutesService.SEARCH]  : SearchPage,
    [RoutesService.PRODUCT] : ProductPage,
    [RoutesService.ADD]     : AddPage,
    [RoutesService.USER]    : UserPage,
    [RoutesService.ABOUT]   : AboutPage,
    [RoutesService.HISTORY] : HistoryPage,
  }

  static getPage(id){
    let   route = RoutesService.pages[id]
    return  route
  }

  static getRootPage(){
    let     root = RoutesService.getPage(RoutesService.HOME)
    return  root
  }
}
