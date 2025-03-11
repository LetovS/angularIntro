import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {IAuth, UserService} from '../../../services/User/user.service';
import {IUser} from '../../../models/User/iuser';

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
  errorMessage: string | null = null;
  get isPasswordsMismatch(): boolean {
    return !this.login || !this.password || this.password.length < 6;
  }

  onLogin() {
    const user: IUser = { login: this.login, password: this.password }; // Используем demo для теста
    console.log('Sending request with:', user);

    this.userService.auth(user).subscribe({
      next: (response: IAuth) => {
        console.log('Ответ пришел:', response.access_token);
        this.errorMessage = null;

      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Логин или пароль неверны'; // Устанавливаем сообщение об ошибке
        } else {
          this.errorMessage = 'Произошла ошибка при аутентификации';
        }
      },
    });
  }

  checkPassword(){
    if(this.password || this.password.length < 6){
      console.log('wrong format');
    }
  }

}
