export interface IUser {
  login: string;
  password: string;
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
