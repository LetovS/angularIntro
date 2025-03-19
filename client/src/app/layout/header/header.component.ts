import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/User/user.service';
import {ToursService} from '../../services/tours/tours.service';
import {initMenuItems, MenuItem} from '../../models/menuItems/menuItems';
import {Router} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {IUser} from '../../models/User/iuser';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenubarModule, ButtonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  menuItems: MenuItem [];
  user: IUser;
  logoutIcon = 'pi pi-user'

  constructor(private userService: UserService,
              private toursService: ToursService,
              private router: Router) {
  }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
    ngOnInit(): void {
        setInterval(() => {
          this.dateTime = new Date();
        }, 1000)

      this.user = this.userService.getUser();
      this.menuItems = initMenuItems();
    }

    logOut(): void {
      // удалить данные о пользователе
      this.router.navigate(['/auth']);
    }
}
