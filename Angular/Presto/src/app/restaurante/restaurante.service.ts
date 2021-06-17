import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from '../base-apis';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService extends BaseApi {

  constructor(private http: HttpClient) {
    super();
  }

  // Get for all restaurants
  getAllRestaurants(): Observable<String[]> {
    return this.http.get<String[]>(
      `${this.URL_BASE}/restaurante/restaurantes/nomes`
    )
  }
}
