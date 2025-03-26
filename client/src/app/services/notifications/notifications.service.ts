import {Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';
import {IOrder} from '../../models/orders/order';
import {ITour} from '../../models/tour/tour';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private messageService: MessageService) {}

  initToast(type: 'error' | 'success',
            message: string,
            summary: string,
            lifeTime: number = 3000) {
    this.messageService.add({ severity: type,
      summary: summary,
      detail: message,
      life: lifeTime });
  }
  showToastWithTemplate(tour: ITour) {
    this.messageService.add({
      key: 'order-add',
      severity: 'info',
      summary: 'Тур добавлен в корзину',
      detail: 'Детали ниже',
      sticky: true,
      life: 6000,
      data: {name: tour.name, price: tour.price}
    });
  }

  clear(orderAdd: string) {
    this.messageService.clear(orderAdd)
  }
}
