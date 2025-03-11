import {environment} from '../../../environments/environment.development';

const baseUrl: string =  environment.apiUrl + '/' + environment.controllerName;

export const API= {
  auth: `${baseUrl}/auth`,
  registration: `${baseUrl}/register`,
}
