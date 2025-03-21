import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API} from '../../shared/api';
import {getXHRResponse} from 'rxjs/internal/ajax/getXHRResponse';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static config: any;
  constructor(private httpClient: HttpClient) { }
  jsonFilePath = `${API.config}`;

  loadObservable(): Observable<any> {
    return this.httpClient.get(this.jsonFilePath);
  }

  loadPromise(): Promise<any> {
    const configPromise = new Promise<any>((resolve, reject) => {
      this.httpClient.get(this.jsonFilePath).toPromise().then((response: any)=> {
        if(response && typeof(response) === 'object') {
          if (Array.isArray(response?.rules)) {
            ConfigService.config = response;
            resolve(response);
          } else{
            reject('Ошибка при инициализации конфига - неверный формат rules' + response);
          }
        } else{
          reject('Ошибка при инициализации конфига - неверный формат' + response);
        }
      }).catch((response) => {
        reject(`Ошибка при загрузке файла '${this.jsonFilePath}': ${JSON.stringify(response)}`);
      });
    })
    const promiseArr = [configPromise];
    return Promise.all(promiseArr);
  }
}
