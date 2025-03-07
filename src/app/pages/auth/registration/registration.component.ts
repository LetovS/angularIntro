import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  template: `
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-6">
        <label for="reg-login" class="block">Логин</label>
        <input id="reg-login" type="text" pInputText [(ngModel)]="regLogin" required class="w-full" />
      </div>
      <div class="p-col-12 p-md-6">
        <label for="email" class="block">Email</label>
        <input id="email" type="email" pInputText [(ngModel)]="email" required class="w-full" />
      </div>
      <div class="p-col-12 p-md-6">
        <label for="reg-password" class="block">Пароль</label>
        <input id="reg-password" type="password" pInputText [(ngModel)]="regPassword" required class="w-full" />
      </div>
      <div class="p-col-12 p-md-6">
        <label for="confirm-password" class="block">Подтвердите пароль</label>
        <input id="confirm-password" type="password" pInputText [(ngModel)]="confirmPassword" required class="w-full" />
      </div>
      <div class="p-col-12">
        <button pButton type="button" label="Зарегистрироваться" (click)="onRegister()" [disabled]="isPasswordsMismatch" class="w-full"></button>
      </div>
    </div>
  `,
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent {
  regLogin: string = '';
  regPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  get isPasswordsMismatch(): boolean {
    return this.regPassword !== this.confirmPassword || !this.regPassword || !this.confirmPassword;
  }

  onRegister() {
    if (this.isPasswordsMismatch) {
      alert('Пароли не совпадают');
      return;
    }
    console.log('Регистрация:', this.regLogin, this.regPassword, this.email);
  }
}
