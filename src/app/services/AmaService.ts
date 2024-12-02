import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Unit } from '../Models/Unit';
import { Project } from '../Models/Project';
import { User } from '../Models/User';
import { RequestCreateProject } from '../Models/DTO/RequestCreateProject';
import { Status } from '../Models/Status';
import { Task } from '../Models/Task';
import { RequestCreateTask } from '../Models/DTO/RequestCreateTask';
import { RequestUpdateTask } from '../Models/DTO/RequestUpdateTask';

@Injectable({
    providedIn: 'root',
  })
  export class AmaService {

    //host = "http://localhost/amadeus-back";
    host = "http://localhost:8899";
  
    constructor(private http: HttpClient) {}

    // Units
    getFirstUnit(): Observable<Unit> {
      return this.http.get<Unit>(this.host + "/unit/first");
    }
  
    getAllUnits(): Observable<Unit[]> {
      return this.http.get<Unit[]>(this.host + "/unit");
    }

    getUnit(id: number): Observable<Unit> {
      return this.http.get<Unit>(this.host + "/unit/" + id);
    }

    getUnitByProject(id: number): Observable<Unit> {
      return this.http.get<Unit>(this.host + "/unit/project/" + id);
    }

    // Projects
    getAllProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.host + "/project");
    }

    getProject(id: number): Observable<Project> {
      return this.http.get<Project>(this.host + "/project/" + id);
    }

    getProjectsForUnit(id: number): Observable<Project[]> {
      return this.http.get<Project[]>(this.host + "/project/unit/" + id);
    }

    createProject(project: RequestCreateProject): Observable<Project> {
      return this.http.post<Project>(this.host + "/project", project);
    }

    // Tasks
    getTasksForProject(id: number): Observable<Task[]> {
      return this.http.get<Task[]>(this.host + "/task/project/" + id);
    }

    getTask(id: number): Observable<Task> {
      return this.http.get<Task>(this.host + "/task/" + id);
    }

    createTask(task: RequestCreateTask): Observable<Task>{
      return this.http.post<Task>(this.host + "/task", task);
    }

    updateTask(id: number, task: RequestUpdateTask): Observable<Task>{
      return this.http.put<Task>(this.host + "/task/" + id, task);
    }

    // Status
    getAllStatuses(): Observable<Status[]> {
      return this.http.get<Status[]>(this.host + "/status");
    }

    // User
    getUser(id: number): Observable<User> {
      return this.http.get<User>(this.host + "/user/" + id);
    }
  }