import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Swiper,Pagination,Navigation } from "swiper";
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { NgOptimizedImage } from '@angular/common'
SwiperCore.use([Autoplay,Pagination,Navigation]);

@Component({
  selector: 'item-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,SwiperModule,NgOptimizedImage],
})
export class ItemImg implements OnInit {
  
  @Input() images:string[] | undefined;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log("IMAGES: ",this.images)
  }
  onSwiper(swiper:Swiper) {
    console.log("ON SWIPER",swiper);

  }

  onSlideChange(e:any) {
    console.log('slide change',e);
  }
}
