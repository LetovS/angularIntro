import {
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import {OrderItemComponent} from './order-item/order-item.component';
import {NgForOf, NgIf} from '@angular/common';
import {CartService} from '../../services/cart/cart.service';
import {NotificationsService} from '../../services/notifications/notifications.service';

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
  orders = inject(CartService).getOrdersReadOnly();

  constructor(private cartService: CartService,
              private notifyService: NotificationsService) {
  }

  ngOnDestroy(): void {
      console.log('Method not implemented.');
  }
  ngOnInit(): void {
  }

  removeOrder(orderId: string) {
    this.cartService.removeOrder(orderId);
  }
}
