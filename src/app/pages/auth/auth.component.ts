import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,
    TabsModule,
    AuthorizationComponent,
    RegistrationComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy{
  ngOnInit() {
    console.log('init')
  }
  ngOnDestroy() {
    console.log('destroy')
  }
}
