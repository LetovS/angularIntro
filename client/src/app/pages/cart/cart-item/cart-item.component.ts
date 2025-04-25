import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IOrderOld} from '../../../models/cart/cart';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './cart-item.component.html',
  standalone: true,
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() order!: IOrderOld;
  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.order.id);
  }
}
