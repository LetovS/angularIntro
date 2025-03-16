import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token') !== ''){
    return true;
  }
  return false;
};
