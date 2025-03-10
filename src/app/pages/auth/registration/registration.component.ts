import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, Checkbox],
  templateUrl: `./registration.component.html`,
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent{

  login: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  isRemember: boolean = false;
  labelText: string = 'Сохранить';

  get isPasswordsMismatch(): boolean {
    return !this.password ||
      !this.confirmPassword ||
      this.password !== this.confirmPassword ;
  }

  onRegister() {
    if (this.isPasswordsMismatch) {
      alert('Пароли не совпадают');
      return;
    }
    console.log('Регистрация:', this.login, this.password, this.email);
  }
  onAuth(){

  }

  onCheckLogin(){
    return !this.login || this.login.length < 3;
  }
}
