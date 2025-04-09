import {environment} from '../../../environments/environment.development';

const baseUrl: string =  environment.apiUrl;

export const API= {
  auth: `${baseUrl}`+ '/' + `${environment.authController}` + '/login',
  registration: `${baseUrl}`+ '/' + `${environment.usersController}` + '/register',
  tours: `${baseUrl}`+ '/' + `${environment.toursController}`,
  config: '/config/config.json',
  changePassword: `${baseUrl}`+ '/' + `${environment.usersController}`+ '/change-password',
  countries: `${baseUrl}`+ '/' + `${environment.countriesController}` + '/countries',
  getUsers: `${baseUrl}`+ '/' + `${environment.usersController}` + '/users-list',
}
