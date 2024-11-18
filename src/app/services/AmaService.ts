import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Unit } from '../Models/Unit';
import { Project } from '../Models/Project';

@Injectable({
    providedIn: 'root',
  })
  export class AmaService {

    //host = "http://localhost/amadeus-back";
    host = "http://localhost:8899";
  
    constructor(private http: HttpClient) {}
  
    getAllUnits(): Observable<Unit[]> {
      return this.http.get<Unit[]>(this.host + "/unit");
    }

    getUnit(id: number): Observable<Unit> {
      return this.http.get<Unit>(this.host + "/unit/" + id);
    }

    getAllProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.host + "/project");
    }
  }