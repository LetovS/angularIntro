import { Injectable } from '@angular/core';
import {IUser} from '../../models/User/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;
  constructor() { }

  private getUserByLogin(login : string): IUser | null {
    return this.userStorage.find(u => u.login === login) || null;
  }

  public addUser(user : IUser, isRememberMe?: boolean) : true | string{
    if (this.getUserByLogin(user.login)){
      return 'User already exists';
    }
    this.userStorage.push(user);
    return true;
  }

  public isUserExist(login : string) : boolean{
    return !!this.getUserByLogin(login);
  }
}
