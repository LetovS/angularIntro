export interface IUser {
  id?: string;
  login: string;
  password?: string;
  email?: string;
  role?: string;
  nickname?: string;
}

export interface IUserRegistration {
  email: string;
  password: string;
  login: string;
  nickname: string;
}

export interface IUserError {
  status: number,
  message: string
}

export interface IChangePassword{
  login: string;
  oldPassword: string;
  newPassword: string;
}

export class IChangeRoleRequest {
  id: string;
  role: string;
}

export const UserStorageKey = 'current_user';
export const JwtTokenKey = 'token';
