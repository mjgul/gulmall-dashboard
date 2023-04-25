import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
