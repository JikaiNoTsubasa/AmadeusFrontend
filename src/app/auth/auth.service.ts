import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost/amadeus-back/auth';

  constructor() { }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap((result) => {
        sessionStorage.setItem('authUser', JSON.stringify(result));
      }));
  }

  logout() {
    sessionStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return sessionStorage.getItem('authUser') !== null;
  }
}
