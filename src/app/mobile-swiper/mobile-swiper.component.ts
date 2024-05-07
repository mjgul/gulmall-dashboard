import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonImg,
} from '@ionic/angular/standalone';
import Swiper from 'swiper';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import { BrowserElementsService } from 'src/app/services/browser-elements.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mobile-swiper',
  templateUrl: './mobile-swiper.component.html',
  styleUrls: ['./mobile-swiper.component.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TranslateModule,
    IonIcon,
  ],
})
export class MobileSwiperComponent implements OnInit, AfterViewInit {
  @Input('images') images;
  @Input('post_type') post_type;

  portraitMode = true;
  // @Input('lowestRatio') lowestRatio;
  @Input('finalHeight') finalHeight = '300px';

  activeIndex = 0;
  swiper: Swiper;
  imageLoaded: boolean[];

  
  browser = inject(BrowserElementsService);

  constructor() {}

  ngOnInit() {
    console.log('swiper');
    this.imageLoaded = new Array(this.images.length).fill(false);

    console.log('images..........', this.imageLoaded, this.images);
  }

  ngAfterViewInit() {
    console.log('swiper after');
    if (this.browser.isBrowser && this.images && this.images.length > 0) {
      this.initSwiper();
    }
  }


  initSwiper() {
    this.swiper = new Swiper('.details-banner', {
      modules: [Pagination, Navigation, Zoom],

      slidesPerView: 1,

      observer: true,
      zoom: {
        maxRatio: 3,
        minRatio: 1,
      },
      observeParents: true,

      pagination: {
        el: '.swiper-pag',
        dynamicBullets: true,
        dynamicMainBullets: 3,

        clickable: true,
        renderBullet: (index, className) => {
          return '<span class="' + className + '"></span>';
        },
      },
      on: {
        slideChange: () => {
          this.activeIndex = this.swiper.activeIndex;
        },
      },
    });
   
  }

  onImageLoad(index) {
    this.imageLoaded[index] = true;
    console.log('loaded', index);
  }
}
