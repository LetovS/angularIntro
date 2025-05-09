import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {IAuth, UserService} from '../../../services/user/user.service';
import {IUser, JwtTokenKey} from '../../../models/User/iuser';
import {NotificationsService} from '../../../services/notifications/notifications.service';
import {Router} from '@angular/router';
import {TranslatePipe} from '../../../pipies/translate.pipe';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, Checkbox, TranslatePipe],
  templateUrl: './authorization.component.html',
  styleUrls: ['authorization.component.scss']
})
export class AuthorizationComponent {
  constructor(private userService: UserService,
              private notificationService: NotificationsService,
              private router: Router) {
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
    const user: IUser = { login: this.login, password: this.password };

    this.userService.auth(user).subscribe({
      next: (response: IAuth) => {
        this.notificationService.initToast('success',
          'Authorization successful',
          'Authorization');
        this.errorMessage = null;
        sessionStorage.setItem(JwtTokenKey, response.access_token);
        this.router.navigate(['/tours'])
      }
    });
  }

  checkPassword(){
    if(this.password || this.password.length < 6){
      console.log('wrong format');
    }
  }
}
