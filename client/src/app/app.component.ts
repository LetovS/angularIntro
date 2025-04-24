import {Component, inject, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterOutlet, ActivatedRoute} from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';
import {ButtonDirective} from "primeng/button";
import {TranslatePipe} from './pipies/translate.pipe';
import {takeUntil} from 'rxjs';
import {SignalRService} from './services/signal-r.service';
import {NotificationsService} from './services/notifications/notifications.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ToastModule, ButtonDirective, TranslatePipe],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'intro';
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  constructor(private signalRService: SignalRService,
              private notifyService: NotificationsService) {
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }

  ngOnInit(): void {
    console.log('start')
    // Подключаем SignalR
    this.signalRService.startConnection(3333);

    // Подписка на событие (например, FileStatusChanged, или можно создать UsersUpdated)
    this.signalRService.onFileStatusChanged(() => {
      console.log('///USERS:SignalR => получено обновление, обновляем список пользователей');
      this.notifyService.initToast('success', 'Сервер шлёт привет :)', 'Hello');
    });
  }
}
