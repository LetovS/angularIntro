import {Injectable, OnInit} from '@angular/core';
import {IOrder} from '../models/order';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService{
  orders: IOrder [] = [];

  ordersBehavior = new BehaviorSubject<IOrder []>(this.orders);
  public readonly orders$ = this.ordersBehavior.asObservable();

  constructor() { }

  addOrders(order : IOrder){
    this.orders.push(order);
    console.log('this.orders.length',this.orders.length)
    this.ordersBehavior.next(this.orders);
  }
}
