import {computed, Injectable, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ITour} from '../../models/tour/tour';
import {initTestData, IOrder} from '../../models/orders/order';
import {NotificationsService} from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Сигнал для заказов
  private _orders = signal<IOrder[]>([]);

  // Сигнал для количества (вычисляемое значение)
  private _cartCount = computed(() => this._orders().length)

  constructor(private notificationService: NotificationsService) {
  }

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
        price: 333
      }]
    };
    this._orders.update(orders => [...orders, newOrder]);
    this.notificationService.initToast("success", 'Your order was added', '',1000)
  }
  getOrders(): IOrder []{
    return this._orders();
  }
  getOrdersReadOnly(): Signal<IOrder[]> {
    return this._orders.asReadonly();
  }
  // Удалить заказ по ID
  removeOrder(orderId: string): void {
    this._orders.update(orders => orders.filter(o => o.id !== orderId));
  }
}
