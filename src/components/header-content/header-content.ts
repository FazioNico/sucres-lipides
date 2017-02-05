/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   18-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 02-01-2017
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the HeaderContent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})
export class HeaderContentComponent {

    @Input() title: string;
    @Input() isClassOpacity:boolean = false;
    @Input() btnUserAuth:boolean = null;
    @Input() backEnabled: Boolean;
    @Output() clickLog: EventEmitter<any> = new EventEmitter();
    @Output() onBack: EventEmitter<any> = new EventEmitter();
    showBack:Boolean;

  constructor() {
  }

  onClickLogin(){
    this.clickLog.emit({})
  }

  ngOnInit() {
      this.showBack = this.backEnabled;
  }

  onClickBack(){
    this.onBack.emit({})
  }
}
