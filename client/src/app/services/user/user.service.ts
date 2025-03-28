import { Injectable } from '@angular/core';
import {IChangePassword, IUser, IUserRegistration} from '../../models/User/iuser';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {catchError, from, Observable, of, tap, throwError} from 'rxjs';
import {NotificationsService} from '../notifications/notifications.service';
import {ApiClientService} from '../../../api-clien/api-client.service';
import {ChangePasswordDto, CreateUserDto} from '../../../api-clien';


export interface IAuth {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: IUser | null = null;
  constructor(
    private httpClient: HttpClient,
    private notifyService: NotificationsService,
    private api: ApiClientService) { }

  public addUser(user: IUserRegistration, isRememberMe?: boolean): Observable<any> {
    console.log('Start registration ...');
    const userDto: CreateUserDto = {
      login: user.login,
      password: user.password,
      nickname: user.nickname,
      email: user.email
    };
    console.log(userDto);

    // Преобразуем Promise в Observable
    return from(this.api.users.usersControllerAddUser({ requestBody: userDto })).pipe(
      tap((data) => {
        console.log('Registration successful', data);
        // Здесь можно добавить логику для isRememberMe если нужно
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(() => error); // Пробрасываем ошибку дальше
      })
    );
  }

  public auth(user: IUser): Observable<IAuth> {
    return this.httpClient.post<IAuth | null>(API.auth, user).pipe(
      tap((response) => {
        console.log('Response received:', response); //TODO использовать токен
        this.setUser(user);
      }),
      catchError((error) => {
        alert(error)
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
    const request = JSON.stringify(data);
    console.log(request);
    console.log(API.changePassword)

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
