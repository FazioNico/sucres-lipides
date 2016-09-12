import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/*
  Generated class for the MenuSlide component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'menu-slide',
  templateUrl: 'build/components/menu-slide/menu-slide.html',
  styles: [`
    ion-menu ion-icon.item-icon {
        margin-right: 10px;
    }
  `]
})
export class MenuSlide implements OnInit {
  contentInit:any;
  @Input() content: any;
  @Input() btnUserAuth:boolean = null;
  @Output() clickMenu: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  eventClick(value){
    this.clickMenu.emit({page: value})
  }
  ngOnInit(){
    this.contentInit = this.content;
  }
}
