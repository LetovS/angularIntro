import {computed, Injectable, OnInit} from '@angular/core';
import {ITour} from '../../models/tour/tour';
import {IOrder} from '../../models/orders/order';
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
  orders: IOrder[] = [];
  private _orders = new BehaviorSubject<IOrder[]>(this.orders);
  public  orders$ = this._orders.asObservable();
  currentUser: IUser | null = null;
  constructor(private notificationService: NotificationsService,
              private userService: UserService, private httpClient: HttpClient,) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
  }

  addOrder(tour: ITour): void {
    const newOrder: IOrder = {
      id: `ORD-${Date.now()}`,
      customerName: this.userService.getUser().nickname,
      date: new Date(),
      status: false,
      total: tour.price,
      items: [{
        name: tour.name,
        quantity: 1,
        price: tour.price,
      }]
    };

    this.notificationService.initToast("success", 'Your order was added', '',1000)
  }

  getOrdersByUserId(userId: string): Observable<IOrder> {
    const user = this.userService.getUser();
    return  this.httpClient.get<IOrder>(API.getCartsById + `/${user.id}`);
  }
  getOrders(): IOrder []{
    return  [];
  }


  removeOrder(orderId: string): void {

  }
}
