import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Unit } from '../Models/Unit';

@Injectable({
    providedIn: 'root',
  })
  export class AmaService {

    host = "http://localhost:5008";
  
    constructor(private http: HttpClient) {}
  
    getAllUnits(): Observable<Unit[]> {
      return this.http.get<Unit[]>(this.host + "/unit");
    }

    getUnit(id: number): Observable<Unit> {
      return this.http.get<Unit>(this.host + "/unit/" + id);
    }
  }