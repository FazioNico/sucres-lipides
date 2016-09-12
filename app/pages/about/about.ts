import { Component }        from '@angular/core';
import {
    NavController,
    Slides
}                           from 'ionic-angular';

import { HeaderContent }    from '../../components/header-content/header-content';

import { Routes }           from '../../providers/routes/routes';

/*
  Generated class for the AboutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/about/about.html',
  directives: [HeaderContent]
})
export class AboutPage {

  isAuth:boolean = false;
  aboutSegment: any;

  /** Not normally mandatory but create bugs if ommited. **/
  static get parameters() {
        return [
          [NavController],
          [Routes]
        ];
  }

  constructor(
    private nav       : NavController,
    private routes    : Routes
  ) {
    this.aboutSegment = "history";
  }

}
