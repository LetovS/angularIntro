import {computed, Injectable, OnInit} from '@angular/core';
import {ITour} from '../../models/tour/tour';
import {IOrderOld, IOrderItem} from '../../models/cart/cart';
import {NotificationsService} from '../notifications/notifications.service';
import {UserService} from '../user/user.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {IUser} from '../../models/User/iuser';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
  cartItems: IOrderItem[] = [];

  private cartItemsBehavior = new BehaviorSubject<IOrderItem[]>(this.cartItems);
  public  cartItems$ = this.cartItemsBehavior.asObservable();
  currentUser: IUser | null = null;

  constructor(private notificationService: NotificationsService,
              private userService: UserService,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
  }

  addOrder(tour: ITour): void {
    const newItem: IOrderItem = {
      name: tour.name,
      quantity: 1,
      price: tour.price
    };

    // Добавляем в массив2
    this.cartItems.push(newItem);

    // Отправляем обновленный массив
    this.cartItemsBehavior.next([...this.cartItems]);

    this.notificationService.initToast("success", 'Your order was added', '', 2000);
  }


  getOrdersByUserId(userId: string): Observable<IOrderOld> {
    const user = this.userService.getUser();
    return  this.httpClient.get<IOrderOld>(API.getCartsById + `/${user.id}`);
  }
  getOrders(): IOrderOld []{
    return  [];
  }

  showForms: boolean = false;

  removeOrder(items: string []): void {
    const msg = items.length > 1 ? 'Заказы удалены' : 'Заказ удалён'
    this.cartItems = this.cartItems.filter(item => !items.includes(item.name));

    this.cartItemsBehavior.next([...this.cartItems]);

    this.notificationService.initToast('success', msg, '', 2000);
  }
}

