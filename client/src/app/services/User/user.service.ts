import { Injectable } from '@angular/core';
import {IUser,IUserRegistration} from '../../models/User/iuser';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;
  constructor(private httpClient: HttpClient) { }

  private getUserByLogin(login : string): IUser | null {
    return this.userStorage.find(u => u.login === login) || null;
  }

  public addUser(user : IUserRegistration, isRememberMe?: boolean) : true | string{

    const result = this.httpClient.post(API.registration, user).subscribe();
    if (result){
      return true;
    }
    else{
      return 'Something gone wrong';
    }

  }

  public isUserExist(login : string) : boolean{
    return !!this.getUserByLogin(login);
  }
}
