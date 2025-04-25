import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
