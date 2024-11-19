import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Unit } from '../Models/Unit';
import { Project } from '../Models/Project';
import { User } from '../Models/User';

@Injectable({
    providedIn: 'root',
  })
  export class AmaService {

    //host = "http://localhost/amadeus-back";
    host = "http://localhost:8899";
  
    constructor(private http: HttpClient) {}

    getFirstUnit(): Observable<Unit> {
      return this.http.get<Unit>(this.host + "/unit/first");
    }
  
    getAllUnits(): Observable<Unit[]> {
      return this.http.get<Unit[]>(this.host + "/unit");
    }

    getUnit(id: number): Observable<Unit> {
      return this.http.get<Unit>(this.host + "/unit/" + id);
    }

    getAllProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.host + "/project");
    }

    getUser(id: number): Observable<User> {
      return this.http.get<User>(this.host + "/user/" + id);
    }
  }