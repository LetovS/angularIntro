import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {IChangePassword, IUser, UserStorageKey} from '../../../models/User/iuser';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Button,
    InputText
  ],
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,) {}

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      //TODO метод на сервере по смене пароля
      const user = JSON.parse(sessionStorage.getItem(UserStorageKey)) as IUser;

      const changePasswordRequest: IChangePassword = {
        login: user.login,
        oldPassword: this.passwordForm.get('oldPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      }

      this.userService.changePassword(changePasswordRequest)
        .subscribe((data) => {
          if(data)
            sessionStorage.setItem('user', JSON.stringify({
              login:changePasswordRequest.login,
              password: changePasswordRequest.newPassword
            }));
          else{
            alert('Something went wrong!')
          }
      })
    }
  }
}
