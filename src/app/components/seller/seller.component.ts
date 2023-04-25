import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule]
})
export class SellerComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
