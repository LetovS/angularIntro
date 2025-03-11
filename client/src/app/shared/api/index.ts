import {environment} from '../../../environments/environment.development';

const baseUrl: string =  environment.apiUrl;

export const API= {
  auth: `${baseUrl}`+ '/' + `${environment.authController}` + '/login',
  registration: `${baseUrl}`+ '/' + `${environment.usersController}` + '/register',
}
