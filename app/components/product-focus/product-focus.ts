/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   06-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 28-07-2016
*/

import {
  Component,
  Input,
  ViewChild
}                             from '@angular/core';
import { Slides }             from 'ionic-angular';

import { Sugar }              from '../sugar/sugar';
import { Fat }                from '../fat/fat';

/*
  Generated class for the ProductFocus component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'product-focus',
  templateUrl: 'build/components/product-focus/product-focus.html',
  directives: [
    Sugar,
    Fat
  ]
})
export class ProductFocus {

  sugar_100g:number;
  fat_100g:number;
  fat_portion:number;
  focusTab: string;

  @Input() productFocusInput            : any[];
  @ViewChild('mySlider')      slider    : Slides;
  @ViewChild('mySliderFat')   sliderFat : Slides;
  @ViewChild('Fat')           fat       : Fat;

  constructor(
  ) {
    this.focusTab = "sugar";
    this.sugar_100g;
  }

  calculeSugar(){
    if(!this.productFocusInput[0].sugars_100){
      this.sugar_100g = this.productFocusInput[0].carbohydrates_100
    }
    else {
      this.sugar_100g = this.productFocusInput[0].sugars_100
    }
  }

  animateSugar(){
    let sugars:any = document.getElementsByClassName('sugar')
    let i = 0;
    for (let sugar of sugars) {
      setTimeout(function(){
        sugar.style.opacity = 1
      }, ++i*100)
    }
  }

  onSegmentChanged(event){
      // capture event segment
      //console.log(event.value)
      if(event.value == 'sugar') {
        //console.log('loading sugar animation')
        let self = this;
        setTimeout(function(){
          self.animateSugar()
        }, 500)
      }
      if(event.value == 'fat'){
        let self = this;
        setTimeout(function(){
          self.fat_100g = self.productFocusInput[0].fat_100
          if(self.productFocusInput[0].fat_portion){
            self.fat_portion = self.productFocusInput[0].fat_portion
          }
        }, 500)
        //console.log(this.fat.text)
      }
  }

  onSlideChanged(){
    // capture event slider
    if(this.slider){
      //let currentIndex = this.slider.getActiveIndex();
      //console.log(this.slider);
    }
    if(this.sliderFat){
      //let currentIndex = this.sliderFat.getActiveIndex();
      //console.log(this.sliderFat);
    }
  }

  ngOnInit() {
    this.calculeSugar()
    let self = this;
    setTimeout(function(){
      self.animateSugar()
    }, 800)
  }

}
