import { Component } from '@angular/core';
import {SettingItemComponent} from './setting-item/setting-item.component';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {Card} from 'primeng/card';
import {ModalComponent} from '../../common/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {TranslatePipe} from '../../pipies/translate.pipe';

@Component({
  selector: 'app-settings',
  imports: [
    RouterLink,
    Button,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  menuItems = [
    { label: 'Смена пароля', path: 'change-password' },
    { label: 'Статистика', path: 'statistics' },
    { label: 'Редактирование туров', path: 'tours-editor' },
    { label: 'Пользователи', path: 'users' },
  ];

}
