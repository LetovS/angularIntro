import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {OrderItemComponent} from './order-item/order-item.component';
import {NgForOf, NgIf} from '@angular/common';
import {IOrder} from '../../models/orders/order';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-orders',
  imports: [
    OrderItemComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnDestroy(): void {
      console.log('Method not implemented.');
  }
  ngOnInit(): void {
    this.orders = this.cartService.getOrders();
  }

  //TODO move to service IOrdersService
  addOrder(newOrder: IOrder) {
    this.orders.push(newOrder);
  }

  removeOrder(orderId: string) {
    this.orders = this.orders.filter(order => order.id !== orderId);
  }
}
