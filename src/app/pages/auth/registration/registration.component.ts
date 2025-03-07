import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: `./registration.component.html`,
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent {

  regLogin: string = '';
  regPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  get isPasswordsMismatch(): boolean {
    return !this.regPassword ||
      !this.confirmPassword ||
      this.regPassword !== this.confirmPassword ;
  }

  onRegister() {
    if (this.isPasswordsMismatch) {
      alert('Пароли не совпадают');
      return;
    }
    console.log('Регистрация:', this.regLogin, this.regPassword, this.email);
  }
}
