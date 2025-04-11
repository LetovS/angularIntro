import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILocation } from '../models/tour/tour';
import { Observable } from 'rxjs';
import { API } from '../shared/api';
import { IAnotherCountryResponse, ICoords, IWeatherResponse } from '../models/models';

/**
 * Сервис для работы с картами и геоданными
 * @description Предоставляет методы для получения погодных данных и информации о местоположениях
 * @Injectable
 * @providedIn 'root'
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {

  /**
   * Конструктор сервиса
   * @param {HttpClient} httpClient - HTTP клиент для выполнения запросов
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Получает данные о погоде для указанных координат
   * @param {ICoords} cord - Объект с координатами (широта и долгота)
   * @returns {Observable<IWeatherResponse>} Observable с данными о погоде
   * @example
   * this.mapService.getWeather({ lat: 55.7558, lng: 37.6176 })
   *   .subscribe(weather => console.log(weather));
   */
  getWeather(cord: ICoords): Observable<IWeatherResponse> {
    const params = {
      "latitude": cord.lat,
      "longitude": cord.lng,
      "hourly": "temperature_2m",
      "current": ["is_day", "snowfall", "rain"],
      "forecast_days": 1
    };
    console.log('sending request ', params)
    return this.httpClient.get<IWeatherResponse>(API.getWhether, { params: params })
  }

  /**
   * Получает информацию о другом городе/стране по названию города
   * @param {string} cityName - Название города для поиска
   * @returns {Observable<IAnotherCountryResponse>} Observable с информацией о местоположении
   * @example
   * this.mapService.getAnother('Paris')
   *   .subscribe(data => console.log(data));
   */
  getAnother(cityName: string): Observable<IAnotherCountryResponse> {
    console.log('Sending detail capital', cityName)
    const params = {
      q: cityName,
      format: 'json',
    }
    return this.httpClient.get<IAnotherCountryResponse>(API.getCapital, { params });
  }
}
