import {Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import { MessageService } from 'primeng/api';
import {CustomToastComponent} from '../../common/customtoast/customtoast.component';

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
  showToastWithTemplate(template: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    const componentRef = viewContainerRef.createComponent(CustomToastComponent);
    componentRef.instance.template = template;

    this.messageService.add({
      severity: 'success',
      summary: 'Тур добавлен в корзину',
      detail: 'Детали ниже',
      sticky: true,
      content: componentRef.location.nativeElement,
    } as any);
  }
}
