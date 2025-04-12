import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Login', example: 'login' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password', example: 'password'})
  password: string;
}

export class AuthTokensResponse {
  @ApiProperty({ description: 'Access token for authorization' })
  access_token: string;

  @ApiProperty({ description: 'Refresh token for re-authentication', example: 'null' })
  refresh_token?: string;
}