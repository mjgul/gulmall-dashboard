import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ItemImg } from './img/img.component';
import { Item } from 'api-package';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'item-component',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone:true,
  imports:[IonicModule,ItemImg,CommonModule]
})
export class ItemComponent implements OnInit {
  img:string = "https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8"
  @Input() item:Item;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {}

}
