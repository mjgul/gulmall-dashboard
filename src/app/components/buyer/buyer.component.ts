import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule]
})
export class BuyerComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
