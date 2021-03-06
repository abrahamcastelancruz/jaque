import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint =
    'https://run.mocky.io/v3/d5ddf1ff-a0e2-4a7e-bbcc-e832bef6a503';

  constructor(private http: HttpClient) {}

  listUsers() {
    return this.http.get(this.endpoint);
  }
}
