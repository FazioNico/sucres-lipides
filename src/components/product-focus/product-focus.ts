/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   02-01-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 03-02-2017
*/

import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Slides }             from 'ionic-angular';

/*
  Generated class for the ProductFocus component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'product-focus',
  templateUrl: 'product-focus.html'
})
export class ProductFocusComponent implements OnInit{

  sugar_100g:number;
  fat_100g:number;
  fat_portion:number;
  focusTab: string;

  @Input() productFocusInput: any[];
  @ViewChild('mySliderSugar') sliderSugar: Slides; // using to detect slide change
  @ViewChild('mySliderFat') sliderFat: Slides; // using to detect slide change

  constructor() {
    //console.log('Hello ProductFocus Component');
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

  // detect slide change
  onSlideChanged(){
    // capture event slider
    if(this.sliderSugar){
      //let currentIndex = this.sliderSugar.getActiveIndex();
      //console.log(this.sliderSugar);
    }
    if(this.sliderFat){
      //let currentIndex = this.sliderFat.getActiveIndex();
      //console.log(this.sliderFat);
    }
  }

  ngOnInit() {
    this.calculeSugar()
    setTimeout(()=>{
      this.animateSugar()
    }, 800)
  }
}
