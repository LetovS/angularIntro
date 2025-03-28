import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://local/payment';

  constructor(private http: HttpClient) {}

  getPaymentMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/methods`);
  }

  getPaymentForm(method: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/form`, { method });
  }

  processPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/process`, paymentData);
  }
}
