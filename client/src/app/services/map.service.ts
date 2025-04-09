import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILocation} from '../models/tour/tour';
import {Observable} from 'rxjs';
import {API} from '../shared/api';
import {IAnotherCountryResponse, ICoords, IWeatherResponse} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private httpClient: HttpClient) { }

  getWeather(cord: ICoords): Observable<IWeatherResponse> {
    const params = {
      "latitude": cord.lat,
      "longitude": cord.lng,
      "hourly": "temperature_2m",
      "current": ["is_day", "snowfall", "rain"],
      "forecast_days": 1
    };
    console.log('sending request ', params)
    return this.httpClient.get<IWeatherResponse>(API.getWhether, {params: params})
  }

  getAnother(cityName: string, ): Observable<IAnotherCountryResponse> {
    console.log('Sending detail capital', cityName)
    const params = {
      q: cityName,
      format: 'json',
    }
    return this.httpClient.get<IAnotherCountryResponse>(API.getCapital, {params});
  }
}
