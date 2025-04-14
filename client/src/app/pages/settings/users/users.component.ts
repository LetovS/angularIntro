import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {BackspaceDirective} from '../../../shared/directives/backspace.directive';
import {Subject, takeUntil} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import {IChangeRoleRequest, IUser} from '../../../models/User/iuser';
import {Card} from 'primeng/card';
import { SelectItem } from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-users',
  imports: [
    Button,
    RouterLink,
    BackspaceDirective,
    Card,
    FormsModule,
    DropdownModule
  ],
  templateUrl: './users.component.html',
  standalone: true,
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUser [] = [];
  userStore: IUser[] = [];
  private destroy$ = new Subject<void>();

  roles: SelectItem[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Moderator', value: 'moderator' },
    { label: 'User', value: 'user' },
    { label: 'Guest', value: 'guest' }
  ];

  constructor(private usersService: UserService) {
  }

  ngOnInit() {
    console.log('///USERS:ngOnInit');
    this.usersService.getUsers()
    .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('///USERS:received data', data);
        if(Array.isArray(data)){
          this.users = data
        }
      })
  }

  ngOnDestroy() {
    this.users = [];
    this.destroy$.next();
    this.destroy$.complete();
  }

  isUserModified(user: IUser): boolean {
    const original = this.userStore.find(u => u.id === user.id);
    return original?.email !== user.email || original?.role !== user.role;
  }

  userUpdate(user: IUser) {
    // Здесь можно отправить только изменяемые поля
    const updateData: IChangeRoleRequest = {
      id: user.id,
      role: user.role
    };

    // Или отправить весь объект
    this.usersService.changeRole(updateData)
      .subscribe((data) => {
        if(data){
          console.log('ok', data)
        } else {
          console.log('Not ok', data)
        }
      });

    console.log('Updating user:', updateData);

    // После успешного обновления:
    // this.loadUsers();
  }
}
