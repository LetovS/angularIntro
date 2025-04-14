import { Injectable } from '@angular/core';
import {
  IChangePassword,
  IChangeRoleRequest,
  IUser,
  IUserRegistration,
  JwtTokenKey,
  UserStorageKey
} from '../../models/User/iuser';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, Subject, tap, throwError} from 'rxjs';
import {NotificationsService} from '../notifications/notifications.service';

export interface IAuth {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser = new BehaviorSubject<IUser | null>(null);
  public  currentUser$: Observable<IUser | null> = this.currentUser.asObservable();

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
    const token = this.httpClient.post<IAuth | null>(API.auth, user);
    const userDb = this.httpClient.get<IUser>(API.getUser+`/${user.login}`);

    return forkJoin<[IUser, IAuth]>(userDb, token).pipe(
      map((data) => {
        this.setUser(data[0]);
        return data[1];
      })
    )
  }

  public getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(API.getUsers);
  }


  /*
    Возвращает текущего юзера
   */
  public getUser(): IUser{
    return  JSON.parse(sessionStorage.getItem(UserStorageKey)) as IUser || null;
  }

  public setUser(user: IUser): void{
    console.log('set', user);
    this.currentUser.next(user);
    if (user){
      console.log('session',JSON.stringify({login: user?.login, role: user?.role}));
      sessionStorage.setItem(UserStorageKey,
        JSON.stringify({login: user?.login,
          role: user?.role,
          nickname: user?.nickname}));
    } else {
      sessionStorage.removeItem(UserStorageKey);
      sessionStorage.removeItem(JwtTokenKey);
    }
  }

  public changePassword(data: IChangePassword): Observable<boolean> {
    return this.httpClient
      .put<boolean>(API.changePassword, data)
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

  public changeRole(updateData: IChangeRoleRequest): Observable<boolean> {
    return this.httpClient
      .put<boolean>(API.changeRole, updateData)
      .pipe(
        tap((response) => {
          if (response){
            this.notifyService.initToast('success', 'Роль успешно изменена', 'Данные обновлены', 2000)
          }
        }),
        catchError((error) => {
          throw error;
        }));
  }
}
