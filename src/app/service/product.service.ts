import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Product } from '../model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = `${environment.apiUrl}products`;
  http = inject(HttpClient);

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      catchError((err, caught) => {
        throw `error => ${err}`
      })
    )
  }
}
