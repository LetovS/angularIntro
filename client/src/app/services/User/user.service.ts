import { Injectable } from '@angular/core';
import {IUser,IUserRegistration} from '../../models/User/iuser';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {catchError, Observable, of, tap} from 'rxjs';


export interface IAuth {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: IUser | null = null;
  constructor(private httpClient: HttpClient) { }

  public addUser(user : IUserRegistration, isRememberMe?: boolean) : true | string{

    const result = this.httpClient.post(API.registration, user).subscribe();

    if (result){
      return true;
    }
    else{
      return 'Something gone wrong';
    }
  }

  public auth(user: IUser): Observable<IAuth> {
    console.log('Sending request to:', API.auth);

    return this.httpClient.post<IAuth | null>(API.auth, user).pipe(
      tap((response) => {
        console.log('Response received:', response); // Логируем ответ
      }),
      catchError((error) => {
        console.error('Error during authentication:', error);
        throw new Error('Authentication failed');
      })
    );
  }
}
