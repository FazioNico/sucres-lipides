/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-07-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 24-07-2016
*/

import { Component, Input } from '@angular/core';

/*
  Generated class for the Fat component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

@Component({
  selector: 'fat',
  templateUrl: 'build/components/fat/fat.html',
  styles: [`
    .lip_wrapper{
  			height:  100%;
  			width:   100%;
		}
		.lip_liquide {
  			height:       100%;
  			background:   #fff;
  			transition:   0.4s all ease;
		}
		.lip_circle {
		    height:        10rem;
		    width:         10rem;
		    background:    #ffe57f;
		    margin:        auto;
		    overflow:      hidden;
        margin-bottom: 12rem;
        margin-top:    2rem;
		    border-radius: 10rem;
		    box-shadow:    4px 4px 0px #737373;
		}
		.lip_title {
			  color:        #03a9f4;
		    font-size:    3rem;
		    margin:       -9.5rem auto 0;
		    text-align:   center;
		    font-weight:  100;
		}
  `]
})

export class Fat {

  @Input() dataInput: number;

  constructor() {
  }

  setLiquid(value){
    const perCent:number  = 100
    const maxGR:number 	  = 70
    return Math.round(perCent - ( (value/maxGR) * perCent) ).toString() + '%'
  }

}
