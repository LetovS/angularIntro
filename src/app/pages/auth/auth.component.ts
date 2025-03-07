import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, TabViewModule, AuthorizationComponent, RegistrationComponent],
  template: `
    <div class="auth-container">
      <p-tabView>
        <p-tabPanel header="Авторизация">
          <app-authorization></app-authorization>
        </p-tabPanel>
        <p-tabPanel header="Регистрация">
          <app-registration></app-registration>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {}
