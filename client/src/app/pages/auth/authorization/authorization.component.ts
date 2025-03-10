import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {UserService} from '../../../services/User/user.service';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, Checkbox],
  templateUrl: './authorization.component.html',
  styleUrls: ['authorization.component.scss']
})
export class AuthorizationComponent {
  constructor(private userService: UserService) {
}
  login: string = '';
  password: string = '';
  isStay: boolean = false;
  labelText: string = 'Не выходить?';

  get isPasswordsMismatch(): boolean {
    return !this.login || !this.password || this.password.length < 6;
  }

  onLogin() {

    alert(`Авторизация: login=${this.login}, password=${this.password}`);
  }

  checkPassword(){
    if(this.password || this.password.length < 6){
      console.log('wrong format');
    }
  }

}
