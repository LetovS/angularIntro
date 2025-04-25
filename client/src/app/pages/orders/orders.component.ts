import {Component, OnDestroy, OnInit} from '@angular/core';
import {IOrder} from '../../models/order';
import {Card} from 'primeng/card';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {OrdersService} from '../../services/orders.service';
import {Subject, takeUntil} from 'rxjs';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-orders',
  imports: [
    Card,
    DatePipe,
    CurrencyPipe,
    NgIf,
    NgForOf,
    Button
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: IOrder [] = [];
  destroy$: Subject<void> = new Subject<void>();
  constructor(private ordersService: OrdersService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.ordersService.orders$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.orders = data;
    })
  }

  finishedOrder(order: IOrder) {

  }

  cancelOrder(order: IOrder) {

  }
}
