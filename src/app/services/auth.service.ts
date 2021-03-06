import { UserModel } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:sign'; // Base Firebase API
  private apiKey = 'AIzaSyC_rKyfYg4RNXYeM76857LmT5_RLsnOY1o'; // Firebase APIKEY
  private userToken: string;

  constructor(private http: HttpClient) {
    this.readToken(); // Verifying if token exists in LocalStorage
  }

  loginEmailPassword(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}InWithPassword?key=${this.apiKey}`, authData)
      .pipe(
        map((res) => {
          this.saveToken(res['idToken']);
          return res;
        })
      );
  }

  newUser(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };

    return this.http.post(`${this.url}Up?key=${this.apiKey}`, authData);
  }

  private saveToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', token);
    let today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expires', today.getTime().toString());
  }

  private readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  isLoggedIn(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expires = Number(localStorage.getItem('expires'));
    const expiresDate = new Date();
    expiresDate.setSeconds(3600);

    if (expiresDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
