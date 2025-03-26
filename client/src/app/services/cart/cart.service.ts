import {computed, Injectable, OnInit, signal, WritableSignal} from '@angular/core';
import {ITour} from '../../models/tour/tour';
import {initTestData, IOrder} from '../../models/orders/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Сигнал для заказов
  private _orders = signal<IOrder[]>(initTestData());

  // Сигнал для количества (вычисляемое значение)
  private _cartCount = computed(() => this._orders().length)

  get cartCountSignal() {
    return this._cartCount; // или просто return this._cartCount;
  }

  addOrder(tour: ITour): void {
    const newOrder: IOrder = {
      id: `ORD-${Date.now()}`,
      customerName: 'Тестовый клиент',
      date: new Date(),
      status: false,
      total: tour.price,
      items: [{
        name: tour.name,
        quantity: 1,
        price: tour.price
      }]
    };
    this._orders.update(orders => [...orders, newOrder]);
  }
  getOrders(): IOrder []{
    return this._orders();
  }
}
