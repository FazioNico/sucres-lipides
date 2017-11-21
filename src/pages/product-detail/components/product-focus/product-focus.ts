/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-11-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-11-2017
*/

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'product-focus',
  templateUrl: 'product-focus.html',
})
export class ProductFocusComponent implements OnInit{

  sugar_100g:number;
  fat_100g:number;
  fat_portion:number;
  focusTab: string;

  @Input() productFocusInput: any;
  @ViewChild('mySliderSugar') sliderSugar: Slides; // using to detect slide change
  @ViewChild('mySliderFat') sliderFat: Slides; // using to detect slide change

  constructor() {
    this.focusTab = "sugar";
  }

  ngOnInit() {
    this.calculeSugar()
    setTimeout(()=>{
      this.animateSugar()
    }, 800)
  }

  calculeSugar(){
    // if(!this.productFocusInput.nutriments.sugars_100){
    //   this.sugar_100g = this.productFocusInput.nutriments.carbohydrates_100g
    // }
    // else {
      this.sugar_100g = this.productFocusInput.nutriments.sugars_100g
    //}
  }

  animateSugar(){
    let sugars:any = document.getElementsByClassName('sugar')
    let i = 0;
    for (let sugar of sugars) {
      setTimeout(()=>{
        sugar.style.opacity = 1
      }, ++i*100)
    }
  }

  onSegmentChanged(event){
    // capture event segment
    //console.log(event.value)
    if(event.value == 'sugar') {
      setTimeout(()=>{
        this.animateSugar()
      }, 500)
    }
    if(event.value == 'fat'){
      setTimeout(()=>{
        this.fat_100g = this.productFocusInput.nutriments.fat_100
        if(this.productFocusInput.nutriments.fat_portion){
          this.fat_portion = this.productFocusInput.nutriments.fat_portion
        }
      }, 500)
      //console.log(this.fat.text)
    }
  }

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
}
