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
import {ActivatedRoute, Router} from '@angular/router';
import {StyleClass} from 'primeng/styleclass';

@Component({
  selector: 'app-orders',
  imports: [
    OrderItemComponent,
    NgIf,
    NgForOf,
    StyleClass
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders = inject(CartService).getOrdersReadOnly();

  constructor(private cartService: CartService,
              private notifyService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.notifyService.clear('order-add');
  }

  removeOrder(orderId: string) {
    this.cartService.removeOrder(orderId);
  }
}
