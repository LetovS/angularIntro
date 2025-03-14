import { Injectable } from '@angular/core';
import {IUser,IUserRegistration} from '../../models/User/iuser';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {catchError, Observable, of, tap, throwError} from 'rxjs';


export interface IAuth {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: IUser | null = null;
  constructor(private httpClient: HttpClient) { }

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
        console.log('Response received:', response);
      }),
      catchError((error) => {
        alert(error)
        return  throwError(() => error);
      })
    );
  }
}


interface IUserError {
  status: number,
  message: string
}
