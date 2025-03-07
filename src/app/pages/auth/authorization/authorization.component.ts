import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['authorization.component.scss']
})
export class AuthorizationComponent {

  login: string = '';
  password: string = '';

  get isPasswordsMismatch(): boolean {
    return !this.login || !this.password;
  }

  onLogin() {
    if (this.isPasswordsMismatch) {
      alert('Заполните поля');
      return;
    }
    alert(`Авторизация: login=${this.login}, password=${this.password}`);
  }
}
