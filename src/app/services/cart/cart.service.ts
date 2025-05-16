import { Injectable } from '@angular/core';
import { AddItem } from 'src/app/classes/addItem';
import {CartService} from 'api-package'
@Injectable({
  providedIn: 'root'
})
export class OrderService extends AddItem {


      constructor(private orders:CartService) {
            super();
      }

      getAllCarts(){
            return this.orders.getAllCart();
      }
}