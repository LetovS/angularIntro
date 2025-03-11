import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser {
  login: string;
  password: string;
}

export class CreateUserDto {
  @ApiProperty({ description: 'User login', example: 'user1' })
  login: string;

  @ApiProperty({ description: 'User password', example: 'pass1' })
  password: string;
}

@Injectable()
export class UsersService {
  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;

  private getUserByLogin(login: string): IUser | null {
    console.log('Search starting ...');

    const result = this.userStorage.find((u) => u.login === login) || null;
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
    this.userStorage.push(user);
    return true;
  }

  public isUserExist(login: string): boolean {
    return !!this.getUserByLogin(login);
  }
}
