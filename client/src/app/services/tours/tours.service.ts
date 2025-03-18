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
          console.log('Tours received:', response);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Failed to get tours', error);
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
}
