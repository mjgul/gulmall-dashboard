import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderService } from 'src/app/services/cart/cart.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone:true,
  providers:[DatePipe],
  imports:[IonicModule,CommonModule,FormsModule]
})
export class OrdersComponent implements OnInit {
  today_order:string  = "0";
  total_delivered_order:string = "0";
  pending_order:string = null;
  cancel_order:string = "0";
  return_order:string= "0";
  isEdit = false;
  showSellerDetails = false;
  showBuyerDetails = false;

  toggleSellerDetails() {
    this.showSellerDetails = !this.showSellerDetails;
  }

  toggleBuyerDetails() {
    this.showBuyerDetails = !this.showBuyerDetails;
  }
  
  carts = null;
  constructor(private orders:OrderService,public datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllCart()
  }

  async getAllCart(){

    (await this.orders.getAllCarts()).subscribe((res:any)=>{
      this.carts  = res.orders;
      this.pending_order = res.summary.pending_orders;

    })
  }

  updateOrder() {
    this.isEdit = false;
    // Save to backend here
    console.log('Updated Order:', this.carts);
  }

  deleteOrder() {
    console.log('Deleting order...');
  }


  statusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'shipped': return 'primary';
      case 'delivered': return 'medium';
      case 'done': return 'success';
      default: return 'dark';
    }
  }

  updateStatus(order: any) {
    // Call API to update order.status here
    console.log('Status updated for:', order.item_name, '->', order.delivery_status);
  }

}
