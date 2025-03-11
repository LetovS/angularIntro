import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {UserService} from '../../../services/User/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, Checkbox],
  templateUrl: `./registration.component.html`,
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent{

  constructor(private userService: UserService, private router: Router) {}
  nickname: string;
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

  async onAuth(ev: Event){
    console.log(ev);
    let result = this.userService
      .addUser({
          nickname: this.nickname,
          login: this.login,
          password: this.password,
          email: this.email
        },
        this.isRemember);
    if (result) {
      console.log('1');
      try {
        const navigationSuccess = await this.router.navigate(['/not-found']);
        if (navigationSuccess) {
          console.log('Redirect successful');
        } else {
          console.log('Redirect failed');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else {
      console.log('2');
    }
    console.log(result);
  }

  onCheckLogin(){
    return !this.login || this.login.length < 3;
  }
  input (ev: Event){
    console.log(ev);
  }
}
