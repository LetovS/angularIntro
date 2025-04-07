import {CanActivateFn, Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router = inject(Router);

  const isAuth: boolean = !!userService.getUser();
  console.log('isAuth', isAuth);

  if(!isAuth){
    router.navigate(['/auth']);
  }
  return isAuth;
};
