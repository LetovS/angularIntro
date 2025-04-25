import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {UserService} from '../../services/user/user.service';
import {initMenuItems} from '../../models/menuItems/menuItems';
import {Router} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {IUser} from '../../models/User/iuser';
import {MenuItem} from 'primeng/api';
import {Tooltip} from 'primeng/tooltip';
import {CartService} from '../../services/cart/cart.service';
import {TranslatePipe} from '../../pipies/translate.pipe';
import {LocalizationService} from '../../services/localization.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenubarModule, ButtonModule, Tooltip, NgIf, TranslatePipe],
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
  cartItemsCount: any = 0;
  currentLang: string;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService,
              private cartService: CartService,
              private router: Router,
              private localization: LocalizationService,
              private localizationService: LocalizationService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.updateMenuItems();
    this.userService.currentUser$.pipe(
      takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data){
          this.user = data;
        }
      }
    )
    this.localizationService.currentLang$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLang = lang;
        this.updateMenuItems();
      });

    setInterval(() => {
        this.dateTime = new Date();
      }, 1000)
    this.cartService.getOrdersByUserId(this.user.id).subscribe((data) => {

    })
   this.cartService.cartItems$.subscribe((data) => {
     this.cartItemsCount = data.length;
   });
  }

  logOut(): void {
    this.userService.setUser(null);
    this.router.navigate(['/auth']);
  }

  toolTip: 'login' | 'logout' = 'login';
  hoverLogoutBtn(val: boolean): void{
    const user = this.userService.getUser();
    if (user){
      this.toolTip = 'logout';
    } else {
      this.toolTip = !!user ? 'logout' : 'login';
    }
      this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user'
    }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  setLanguage(lang: 'en' | 'ru') {
    this.localization.setLanguage(lang)
  }

  private updateMenuItems(): void {
    if (this.user){
      this.menuItems = initMenuItems(this.localizationService, this.user.role);
    } else {
      this.menuItems = initMenuItems(this.localizationService, null);
    }
  }
}
