import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export interface IUser {
  id?: string;
  login: string;
  password?: string;
}

export class CreateUserRequest {
  @ApiProperty({ description: 'User login', example: 'demo' })
  login: string;

  @ApiProperty({ description: 'User password', example: '123456' })
  password: string;

  @ApiProperty({ description: 'User nickname', example: 'test' })
  nickname: string;

  @ApiProperty({ description: 'User email', example: 'demo@demo.com' })
  email: string;
}

export class ChangePasswordRequest implements IChangePassword {
  @ApiProperty({ description: 'Login user' })
  login: string;
  @ApiProperty({ description: 'Previous user password' })
  oldPassword: string;
  @ApiProperty({ description: 'New user password' })
  newPassword: string;
}

export class ChangeRoleRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User\'s Id' })
  id: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User\'s role' })
  role: string;
}

export interface IChangePassword {
  login: string;
  oldPassword: string;
  newPassword: string;
}