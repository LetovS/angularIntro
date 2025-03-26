import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IOrder} from '../../../models/orders/order';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-order-item',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './order-item.component.html',
  standalone: true,
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  @Input() order!: IOrder;
  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.order.id);
  }
}
