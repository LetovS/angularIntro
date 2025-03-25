import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {API} from '../../shared/api';
import {catchError, Observable, of, tap, throwError} from 'rxjs';
import {ITour,TourRequest} from '../../models/tour/tour';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Получает список туров.
   * @returns Observable<ITour[]> - Массив туров.
   */
  public getTours(): Observable<ITour[]> {
    return this.httpClient
      .get<ITour[]>(API.tours + '/tours') // Указываем тип ответа <ITour[]>
      .pipe(
        tap((response) => {
        }),
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }
  /**
   * Получает список туров возле локации.
   * @returns Observable<ITour[]> - Массив туров.
   */
  public getToursByLocationId(locationId:string): Observable<ITour[]> {
    const url: string = `${API.tours}/nearestTours?locationId=${locationId}`;
    console.log(url);
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
      .get<ITour | null>(API.tours + `/tour/${tourId}`) // Указываем тип ответа <ITour[]>
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
      .delete(API.tours+`/remove-tour/${tourId}`)
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
}
