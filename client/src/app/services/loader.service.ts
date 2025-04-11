import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject: Subject<boolean> = new Subject<boolean>();
  loader$ = this.loaderSubject.asObservable();
  constructor() { }
  setLoader(loader : boolean) {
    this.loaderSubject.next(loader);
  }
}
