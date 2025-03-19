import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/User/user.service';
import {ToursService} from '../../services/tours/tours.service';
import {initMenuItems} from '../../models/menuItems/menuItems';
import {Router} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {IUser} from '../../models/User/iuser';
import {MenuItem} from 'primeng/api';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenubarModule, ButtonModule, Tooltip],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  menuItems: MenuItem [];
  user: IUser;
  logoutIcon = 'pi pi-user'
  cartLogo: string = 'pi pi-shopping-cart';

  constructor(private userService: UserService,
              private toursService: ToursService,
              private router: Router) {
  }

    ngOnDestroy(): void {

    }
    ngOnInit(): void {
      this.user = this.userService.getUser();
      this.menuItems = initMenuItems();
      setInterval(() => {
          this.dateTime = new Date();
        }, 1000)
    }

    logOut(): void {
      this.userService.setUser(null);
      // удалить данные о пользователе
      this.router.navigate(['/auth']);
    }

    hoverLogoutBtn(val: boolean): void{
      this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user'
    }

  // Метод для перехода на страницу заказов
  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }
}
