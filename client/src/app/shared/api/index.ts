import {environment} from '../../../environments/environment.development';

const baseUrl: string =  environment.apiUrl;

export const API= {
  auth: `${baseUrl}`+ '/' + `${environment.authController}` + '/login',
  registration: `${baseUrl}`+ '/' + `${environment.usersController}` + '/register',
  tours: `${baseUrl}`+ '/' + `${environment.toursController}`,
  config: '/config/config.json',
  changePassword: `${baseUrl}`+ '/' + `${environment.usersController}`+ '/change-password',
  countries: `${baseUrl}`+ '/' + `${environment.countriesController}` + '/countries',
  countryByCode: 'https://restcountries.com/v3.1/alpha',
  anotherByCode: 'https://restcountries.com/v3.1/alpha',
  getWhether:"https://api.open-meteo.com/v1/forecast",
  getCapital: 'https://nominatim.openstreetmap.org/search'
}
