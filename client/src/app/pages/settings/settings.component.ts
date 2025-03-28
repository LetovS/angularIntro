import { Component } from '@angular/core';
import {SettingItemComponent} from './setting-item/setting-item.component';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {Card} from 'primeng/card';
import {ModalComponent} from '../../common/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ITour} from '../../models/tour/tour';

@Component({
  selector: 'app-settings',
  imports: [SettingItemComponent, ChangePasswordComponent, RouterLink, Button, Card, ModalComponent, FormsModule, InputText, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  standalone: true,
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  isModalOpen: boolean = false;
  menuItems = [
    { label: 'Смена пароля', path: 'change-password' },
    { label: 'Статистика', path: 'statistics' }
  ];

  closeModal() {
    this.isModalOpen = false;
  }
  openModal() {
    this.isModalOpen = true;
  }
}
