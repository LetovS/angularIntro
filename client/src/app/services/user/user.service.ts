import { Injectable } from '@angular/core';
import {IChangePassword, IUser, IUserRegistration, JwtTokenKey, UserStorageKey} from '../../models/User/iuser';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {catchError, Observable, of, Subject, tap, throwError} from 'rxjs';
import {NotificationsService} from '../notifications/notifications.service';
import {IDateFilter, ITourType} from '../../models/filters/filters';

export interface IAuth {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: IUser | null = null;
  private usersSubject = new Subject<IUser []>();
  readonly usersType$ = this.usersSubject.asObservable();

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

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(API.getUsers);
  }


  /*
    Возвращает текущего юзера
   */
  public getUser(): IUser{
    const user = JSON.parse(sessionStorage.getItem(UserStorageKey)) as IUser;
    return this.currentUser || user;
  }

  public setUser(user: IUser): void{
    console.log('Was ',this.currentUser)
    this.currentUser = user;
    console.log('Stay ',this.currentUser)
    if (user){
      sessionStorage.setItem(UserStorageKey, JSON.stringify({login: user.login}));
    } else {
      sessionStorage.removeItem(UserStorageKey);
      sessionStorage.removeItem(JwtTokenKey);
    }

  }

  public changePassword(data: IChangePassword): Observable<boolean> {
    return this.httpClient
      .post<boolean>(API.changePassword, data)
      .pipe(
        tap((response) => {
          if (response){
            sessionStorage.removeItem(UserStorageKey);
            this.notifyService.initToast('success', 'Пароль успешно изменён', 'Данные обновлены', 2000)
          }
        }),
        catchError((error) => {
          throw error;
        }));
  }
}
