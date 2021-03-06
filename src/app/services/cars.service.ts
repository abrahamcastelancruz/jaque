import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private endpoint =
    'https://run.mocky.io/v3/15517ca5-7e07-4ebc-bf63-5b033ec4e16a'; // Api Endpoint

  constructor(private http: HttpClient) {}

  listSales() {
    return this.http.get(this.endpoint); // Http request to endpoint
  }
}
