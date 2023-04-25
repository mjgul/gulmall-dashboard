import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Image } from 'api-package';
import { Snap } from 'src/app/classes/snap';
import { ItemImg } from '../item/img/img.component';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,ItemImg]
})
export class EditImageComponent implements OnInit {
  @Input() images:Image[] = [];
  dummyImages=['https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8','https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8','https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8','https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8','https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8','https://firebasestorage.googleapis.com/v0/b/gul-e-mall-app.appspot.com/o/default-images%2Ffavorite.png?alt=media&token=9e88348d-6490-4ef7-a282-fbfe29925fb8']
  constructor() { }

  ngOnInit() {}

}
