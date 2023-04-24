import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ItemImg } from './img/img.component';
import { Item } from 'api-package';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddImagesComponent } from '../add-images/add-images.component';
import { EditImageComponent } from '../edit-image/edit-image.component';
import { Snap } from 'src/app/classes/snap';

@Component({
  selector: 'item-component',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone:true,
  imports:[IonicModule,
           ItemImg,
           CommonModule,
           AddImagesComponent,
           EditImageComponent]
})
export class ItemComponent implements OnInit {
  img:string = "https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8"
  @Input() item:Item;
  dummyImages:string[]=["https://sc04.alicdn.com/kf/H71a9f64072ee4898915feb6f0e6f5a7bo/253673331/H71a9f64072ee4898915feb6f0e6f5a7bo.jpg","https://sc04.alicdn.com/kf/H71a9f64072ee4898915feb6f0e6f5a7bo/253673331/H71a9f64072ee4898915feb6f0e6f5a7bo.jpg","https://sc04.alicdn.com/kf/H71a9f64072ee4898915feb6f0e6f5a7bo/253673331/H71a9f64072ee4898915feb6f0e6f5a7bo.jpg","https://sc04.alicdn.com/kf/H71a9f64072ee4898915feb6f0e6f5a7bo/253673331/H71a9f64072ee4898915feb6f0e6f5a7bo.jpg"]
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {}

}
