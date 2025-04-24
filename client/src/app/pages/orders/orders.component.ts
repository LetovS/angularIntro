import {
  Component, computed,
  OnDestroy,
  OnInit
} from '@angular/core';
import {OrderItemComponent} from './order-item/order-item.component';
import {NgForOf, NgIf} from '@angular/common';
import {CartService} from '../../services/cart/cart.service';
import {NotificationsService} from '../../services/notifications/notifications.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IOrder} from '../../models/orders/order';
import {BehaviorSubject, Subject} from 'rxjs';

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
  private destroy$ = new Subject<void>();
  private _cartCount = computed(() => this.cartService.orders$)
  constructor(private cartService: CartService,
              private notifyService: NotificationsService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    //this.notifyService.clear('order-add');
    //this.cartService.orders$
  }

  removeOrder(orderId: string) {
    this.cartService.removeOrder(orderId);
  }
}
