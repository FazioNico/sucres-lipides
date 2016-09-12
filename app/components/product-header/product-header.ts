import { Component, Input } from '@angular/core';

/*
  Generated class for the ProductHeader component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-header',
  templateUrl: 'build/components/product-header/product-header.html',
  styles: [
    `
        .opacity-content {
          opacity: 0;
        }
        .product-header h1{
          text-align:center;
          transition: 0.3s all ease;
        }

        .product-header {
          height: auto;
        }

        .product-img {
          overflow: hidden;
          width: 120px;
          height: 120px;
          margin: 20px auto;
          border-radius: 100%;
          position: relative;
          background-position: center center;
        }
        .transition_anim_5ms {
          transition: 0.3s all ease;
        }
    `
  ]
})
export class ProductHeader {

  @Input() productDataHeaderInput: any[];
  @Input() isClassOpacity: boolean = true;

  constructor() {
  }
}
