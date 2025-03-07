import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  template: `
    <div class="form-group">
      <label for="login">Логин</label>
      <input id="login" type="text" pInputText [(ngModel)]="login" required />
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input id="password" type="password" pInputText [(ngModel)]="password" required />
    </div>
    <div class="form-group">
      <button pButton type="button" label="Войти" (click)="onLogin()"></button>
    </div>
  `,
  styleUrls: ['authorization.component.scss']
})
export class AuthorizationComponent {
  login: string = '';
  password: string = '';

  onLogin() {
    console.log('Авторизация:', this.login, this.password);
  }
}
