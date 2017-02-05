import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/*
  Generated class for the MenuSlide component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'menu-slide',
  templateUrl: 'menu-slide.html'
})
export class MenuSlideComponent implements OnInit {
  contentInit:any;
  @Input() content: any;
  @Input() btnUserAuth:boolean = null;
  @Output() clickMenu: EventEmitter<any> = new EventEmitter();

  constructor() {
    //console.log('Hello MenuSlide Component');
  }

  eventClick(value){
    this.clickMenu.emit({page: value})
  }
  ngOnInit(){
    this.contentInit = this.content;
  }
}
