import {CanActivateFn, Router} from '@angular/router';
import {UserService} from '../../../services/User/user.service';
import {inject} from '@angular/core';
import {IUser} from '../../../models/User/iuser';

export const authGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router = inject(Router);
  const user: IUser = userService.getUser();
  const isAuth: boolean = sessionStorage.getItem('token') !== '' || !!user;
  if(!isAuth){
    router.navigate(['/login']);
  }
  return isAuth;
};
