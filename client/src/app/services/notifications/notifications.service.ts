import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

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
}
