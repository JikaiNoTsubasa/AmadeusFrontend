import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AmaService } from '../services/AmaService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  amaService = inject(AmaService);

  constructor() { }

  login(data: any) {
    return this.httpClient.post(`${this.amaService.host}/auth/login`, data)
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
