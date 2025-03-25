import { Component } from '@angular/core';
import {SettingItemComponent} from './setting-item/setting-item.component';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
  selector: 'app-settings',
  imports: [SettingItemComponent, ChangePasswordComponent, RouterLink, Button],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  menuItems = [
    { label: 'Смена пароля', path: 'change-password' },
    { label: 'Статистика', path: 'statistics' }
  ];
}
