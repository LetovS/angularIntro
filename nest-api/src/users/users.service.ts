import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  login: string;
  password: string;
}

export class CreateUserDto {
  @ApiProperty({ description: 'User login', example: 'demo' })
  login: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  password: string;
}
const userStorage: IUser[] = [];
@Injectable()
export class UsersService {
  
  private currentUser: IUser | null = null;

  public getUserByLogin(login: string): IUser | null {
    console.log('Search starting ...');

    const result = userStorage.find((u) => u.login === login) || null;
    console.log(userStorage);
    if(result)
      console.log('It\'s found');
    else
      console.log('Not found');

    return result;
  }

  public addUser(user: IUser): true | string {
    if (this.getUserByLogin(user.login)) {
      return 'User already exists';
    }
    console.log('Adding new user...');
    userStorage.push(user);
    return true;
  }

  public isUserExist(login: string): boolean {
    return !!this.getUserByLogin(login);
  }

  public getUsersCount(){
    return userStorage.length;
  }
}
this