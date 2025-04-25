import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {API} from '../../shared/api';
import {
  catchError,
  delay,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError,
  withLatestFrom
} from 'rxjs';
import {ILocation, ITour, TourRequest} from '../../models/tour/tour';
import {IDateFilter, ITourType} from '../../models/filters/filters';
import {ICountry} from '../../models/country/country';
import {Coords, IAnotherCountryResponse, ICoords, ISwitchViewModel, IWeatherViewModel} from '../../models/models';
import {MapService} from '../map.service';
import {CartService} from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private tourTypeSubject = new Subject<ITourType | IDateFilter>();
  readonly tourType$ = this.tourTypeSubject.asObservable();
  constructor(
    private httpClient: HttpClient,
    private mapService: MapService,
    private cartService: CartService) { }

  /**
   * Получает список туров.
   * @returns Observable<ITour[]> - Массив туров.
   */
  public getTours(): Observable<ITour[]> {
    const countries = this.httpClient.get<ICountry []>(API.countries);

    const tours =  this.httpClient
      .get<ITour[]>(API.tours);

    return forkJoin<[ICountry [], ITour []]>([countries, tours]).pipe(
      withLatestFrom(this.cartService.cartItems$),
      map(([data, cartItems]) => {
        let toursWithCountries = [] as ITour [];

        const toursArr = data[1];
        const countriesMap = new Map();

        data[0].forEach(c => {
          countriesMap.set(c.iso_code2, c)
        })

        if(Array.isArray(toursArr)){
          toursWithCountries = toursArr.map((tour) =>{
            const isTourInBasket = cartItems.find((cartItem) => cartItem.name === tour.name);
            if (isTourInBasket){
              tour.isCart = true;
            }
            return {
              ...tour,
              country: countriesMap.get(tour.code) || null
            }
          })
          return toursWithCountries;
        }
        return null;
      })
    )
  }
  /**
   * Получает список туров возле локации.
   * @returns Observable<ITour[]> - Массив туров.
   */
  public getToursByLocationId(locationId:string): Observable<ITour[]> {
    const url: string = `${API.tours}/nearby?locationId=${locationId}`;

    return this.httpClient
      .get<ITour[]>(url)
      .pipe(
        tap((response) => {
        }),
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }
  /**
   * Получает детали тура по Ид.
   * @returns Observable<ITour | null> - Массив туров.
   */
  public getTour(tourId: string): Observable<ITour | null> {
    return this.httpClient
      .get<ITour | null>(API.tours + `/${tourId}`)
      .pipe(
        tap((response) => {
        }),
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }

  /**
   * Добавляет новый тур.
   * @param tour - Объект тура, который нужно добавить (тип ITour).
   * @returns Observable<any> - Ответ от сервера после успешного добавления тура.
   * @throws Ошибка, если добавление тура не удалось.
   */
  public addTour(tour : ITour) : Observable<any>{
    return this.httpClient
      .post(API.tours + '/add-tour', tour)
      .pipe(
        tap((response) => {

        }),
        catchError((error) => {
          throw error;
        }));
  }

  /* Удаляет тур по его ID.
  * @param tourId - ID тура, который нужно удалить (тип string).
  * @returns Observable<any> - Ответ от сервера после успешного удаления тура.
  * @throws 404 Ошибка, если удаление тура не удалось.
  */
  public removeTourById(tourId : string) : Observable<any>{
    return this.httpClient
      .delete(API.tours+`/${tourId}`, {withCredentials: true})
      .pipe(
        tap((response) => {

        }),
        catchError((error) => {
          throw error;
        }));
  }

  searchTours(toursStore: ITour[], targetValue: string): ITour [] {
    if (Array.isArray(toursStore)) {
      return toursStore.filter((t) => {
        if (t && typeof t.name === 'string') {
          return t.name.toLowerCase().includes(targetValue.toLowerCase());
        } else{
          return false;
        }
      });
    } else {
      return [];
    }
  }

  initChangeTourType(selectedType: ITourType) {
    this.tourTypeSubject.next(selectedType);
  }

  filterToursByDate(event: IDateFilter) {
    this.tourTypeSubject.next(event);
  }
  getLocationById(id: string) : Observable<ISwitchViewModel>{
    return this.httpClient.get<Coords[]>(API.countryByCode, {params: {codes: id}}).pipe(
      map((countriesDataArr) => countriesDataArr[0]),
      switchMap((countriesData) => {
        console.log('countriesData ',countriesData);
        const coords = {lat: countriesData.latlng[0], lng: countriesData.latlng[1]};

        return this.mapService.getWeather(coords).pipe(
          map((response) => {

            const weatherData: IWeatherViewModel = {
              isDay: response.current.is_day,
              snowFall: response.current.snowFall,
              rain: response.current.rain,
              currentWeather: response.hourly.temperature_2m[13]
            }
            console.log('weatherData ',weatherData);
            return {coords: countriesData, weather: weatherData};
          })
        )
      })
    );
  }

  getCountryData(code: string): Observable<any> {
    return this.httpClient.get<any>( API.anotherByCode + `/${code}`)
      .pipe(
        map((data) => {
          const city:IAnotherCountryResponse = data[0];
          return city;
        }),
        switchMap((city) => {
          const cityName = city.capital[0];
          console.log('Get coords for ', cityName)
          return this.mapService.getAnother(cityName).pipe(
            map((response) => {
              if (Array.isArray(response)) {
                const cits = response[0];
                const lat = parseFloat(cits.lat);
                const lng = parseFloat(cits.lon);
                const cords: ICoords = {lat, lng };
                return {cords};
              } else {
                return {response};
              }
            }),
            switchMap((countriesData) => {
            console.log('/////countriesData ',countriesData);
            let coords: ICoords;

            return this.mapService.getWeather({lat: countriesData.cords.lat, lng: countriesData.cords.lat}).pipe(
              map((response) => {

                const weatherData: IWeatherViewModel = {
                  isDay: response.current.is_day,
                  snowFall: response.current.snowFall,
                  rain: response.current.rain,
                  currentWeather: response.hourly.temperature_2m[13]
                }
                console.log('weatherData ',weatherData);
                return {coords: countriesData, weather: weatherData};
              })
            )
          })
          )
        })
      );
  }

  isCoords(obj: any): obj is ICoords {
    return (
      typeof obj === 'object' &&
      typeof obj.lat === 'number' &&
      typeof obj.lon === 'number'
    );
  }
}
