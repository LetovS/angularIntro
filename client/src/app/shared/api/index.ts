import {environment} from '../../../environments/environment.development';

const baseUrl: string =  environment.apiUrl;

export const API= {
  auth: `${baseUrl}`+ '/' + `${environment.authController}` + '/login',
  registration: `${baseUrl}`+ '/' + `${environment.usersController}` + '/register',
  tours: `${baseUrl}`+ '/' + `${environment.toursController}`,
  config: '/config/config.json',
  changePassword: `${baseUrl}`+ '/' + `${environment.usersController}`+ '/change-password',
  changeRole: `${baseUrl}`+ '/' + `${environment.usersController}`+ '/change-role',
  countries: `${baseUrl}`+ '/' + `${environment.countriesController}`,
  getUsers: `${baseUrl}`+ '/' + `${environment.usersController}`,
  getUser: `${baseUrl}`+ '/' + `${environment.usersController}` + '/userByLogin',
  getCartsById: `${baseUrl}`+ '/' + `${environment.cartController}`,
  countryByCode: 'https://restcountries.com/v3.1/alpha',
  getWhether:"https://api.open-meteo.com/v1/forecast",
  anotherByCode: 'https://restcountries.com/v3.1/alpha',
  getCapital: 'https://nominatim.openstreetmap.org/search'
}
