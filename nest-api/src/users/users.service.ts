import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

export interface IUser {
  id: string;
  login: string;
  password?: string;
}

export class CreateUserDto {
  @ApiProperty({ description: 'User login', example: 'demo' })
  login: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  password: string;

  @ApiProperty({ description: 'User nickname', example: 'test' })
  nickname: string;

  @ApiProperty({ description: 'User email', example: 'demo@demo.com' })
  email: string;
}

export class ChangePasswordDto implements IChangePassword {
  @ApiProperty({ description: 'Login user' })
  login: string;
  @ApiProperty({ description: 'Previous user password' })
  oldPassword: string;
  @ApiProperty({ description: 'New user password' })
  newPassword: string;
}

export interface IChangePassword {
  login: string;
  oldPassword: string;
  newPassword: string;
}

const userStorage: IUser[] = [];

@Injectable()
export class UsersService {
  private currentUser: IUser | null = null;

  constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>){
    console.log('userService run')
  }

  public async getUserByLogin(login: string): Promise<UserDocument | null> {    
    const user = await this.userRepository
      .findOne({login: login})
      .select('+password');
    
    return user ?? null;
  }

  public async addUser(user: IUser): Promise<true | string> {
    
    if (await this.isUserExist(user.login)) {
      return 'User already exists';
    }
    console.log('creating user', user);
    const id = await this.userRepository.create(user);

    return true;
  }

  public async isUserExist(login: string): Promise<boolean> {
    const user = await this.userRepository.findOne({login})
      .lean()
      .exec();
    console.log('find user', user)
    return !!user;
  }

  public async getUsersCount(): Promise<number> {    
    return await this.userRepository.countDocuments().exec();
  }

  public async getUsers(): Promise<IUser[]> {
    const users = await this.userRepository.find().exec();
    console.log('users ', users);
    return users as IUser [];
  }

  public async getUser(userId: string) {    
    const user = await this.userRepository.findById(userId).lean().exec() as unknown as IUser;
    console.log('user: ', user)
    if (user) return user;
    return null;
  }

  async changeUserPassword(changePasswordDto: IChangePassword): Promise<boolean> {
    const user = await this.userRepository
      .findOne({login: changePasswordDto.login})
      .select('+password');

    if (!user) throw new BadRequestException('Пользователь не найден');
    
    const isValid = await user.checkPassword(changePasswordDto.oldPassword);
    if (!isValid) throw new BadRequestException('Неверный старый пароль');
    
    user.password = changePasswordDto.newPassword;
    const result = await user.save();
    console.log(result);
    return true;
  }
}
