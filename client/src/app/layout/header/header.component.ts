import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {UserService} from '../../services/user/user.service';
import {ToursService} from '../../services/tours/tours.service';
import {initMenuItems} from '../../models/menuItems/menuItems';
import {Router} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {IUser} from '../../models/User/iuser';
import {MenuItem} from 'primeng/api';
import {Tooltip} from 'primeng/tooltip';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenubarModule, ButtonModule, Tooltip, NgIf],
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
  cartTitle: string = $localize`:@@cart:Cart`;
  cartToolTip: string = $localize`:@@moveToOrders:Move to orders`;
  logoutLabel: string = $localize`:@@logout:Logout`;
  cartItemsCount: any = 0;

  constructor(private userService: UserService,
              private cartService: CartService,
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
      this.cartItemsCount = this.cartService.cartCountSignal;
    }

    logOut(): void {
      console.log('Устанавливаем currentUser - null and remove token')
      this.userService.setUser(null);
      sessionStorage.removeItem('user');
      // удалить данные о пользователе
      this.router.navigate(['/auth']);
    }

    hoverLogoutBtn(val: boolean): void{
      this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user'
    }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }
}
