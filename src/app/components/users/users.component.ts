import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SellerComponent } from '../seller/seller.component';
import { BuyerComponent } from '../buyer/buyer.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,SellerComponent,BuyerComponent]
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
