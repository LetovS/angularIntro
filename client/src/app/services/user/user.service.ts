import { Injectable } from '@angular/core';
import {IChangePassword, IUser, IUserRegistration} from '../../models/User/iuser';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {NotificationsService} from '../notifications/notifications.service';


export interface IAuth {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: IUser | null = null;
  constructor(private httpClient: HttpClient, private notifyService: NotificationsService) { }

  public addUser(user : IUserRegistration, isRememberMe?: boolean) : Observable<any>{
    return this.httpClient
      .post(API.registration, user)
      .pipe(
        tap((response) => {

        }),
        catchError((error) => {
          throw error;
        }));
  }

  public auth(user: IUser): Observable<IAuth> {
    return this.httpClient.post<IAuth | null>(API.auth, user).pipe(
      tap((response) => {
        this.setUser(user);
      }),
      catchError((error) => {
        return  throwError(() => error);
      })
    );
  }

  /*
    Возвращает текущего юзера
   */
  public getUser(): IUser{
    const user = JSON.parse(sessionStorage.getItem('user')) as IUser;
    return this.currentUser || user;
  }

  public setUser(user: IUser): void{
    this.currentUser = user;
  }

  public changePassword(data: IChangePassword): Observable<boolean> {
    return this.httpClient
      .post<boolean>(API.changePassword, data)
      .pipe(
        tap((response) => {
          if (response){
            sessionStorage.removeItem('user');
            this.notifyService.initToast('success', 'Пароль успешно изменён', 'Данные обновлены', 2000)
          }
        }),
        catchError((error) => {
          throw error;
        }));
  }
}
