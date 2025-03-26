import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {OrderItemComponent} from './order-item/order-item.component';
import {NgForOf, NgIf} from '@angular/common';
import {initTestData, IOrder} from '../../models/orders/order';

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
  ngOnDestroy(): void {
      console.log('Method not implemented.');
  }
  ngOnInit(): void {
    this.orders = initTestData();
  }

  //TODO move to service IOrdersService
  addOrder(newOrder: IOrder) {
    this.orders.push(newOrder);
  }

  removeOrder(orderId: string) {
    this.orders = this.orders.filter(order => order.id !== orderId);
  }
}
