import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { TopmenuComponent } from '../../comps/topmenu/topmenu.component';
import { SidemenuComponent } from '../../sidemenu/sidemenu.component';
import { AmaService } from '../../services/AmaService';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Task } from '../../Models/Task';
import { Status } from '../../Models/Status';
import { RequestUpdateTask } from '../../Models/DTO/RequestUpdateTask';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ CommonModule, ProgressSpinnerModule, ChipModule, CardModule, ToolbarModule, ButtonModule, DialogModule, ReactiveFormsModule, SidemenuComponent, TopmenuComponent, SidebarModule, InputTextModule, DropdownModule, MenuModule, DividerModule, BreadcrumbModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  amaService = inject(AmaService);
  route = inject(ActivatedRoute);
  messageService = inject(MessageService);
  loading = true;

  currentTask: Task;

  // All statuses
  statuses: Status[] = [];

  // Breadcrump
  breadcrumbItems: MenuItem[] = [];
  homeItem: MenuItem = {icon: 'pi pi-home', url: '/'};

  // Task Menu
  taskMenuItems : MenuItem[] = [
    {label: 'Actions', items: [
      {label: 'Edit Task', icon: 'pi pi-pencil'},
      {label: 'Close Task', icon: 'pi pi-lock', command: () => {this.closeTask();}},
      {label: 'Archive Task', icon: 'pi pi-server', command: () => {this.archiveTask();}}
    ]},
    
  ];

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.fetchCurrentTask(id);
    this.fetchAllStatuses();
  }

  fetchCurrentTask(id :number){
    this.amaService.getTask(id).subscribe({
      next:(data: Task) => {
        this.currentTask = data;
        }, 
      error:(error: any)=>{console.log(error);},
      complete:() => {this.loading = false;}
    });
  }

  fetchAllStatuses(){
    this.amaService.getAllStatuses().subscribe({
      next:(data: Status[]) => {
        this.statuses = data;
        }, 
      error:(error: any)=>{this.messageService.add({severity:'error', summary: 'Failed to fetch all statuses', detail: error});},
      complete:() => {}
    });
  }

  closeTask(){
    const newStatus = this.statuses.find(x => x.name == "Closed");
    var req = new RequestUpdateTask();
    req.statusId = newStatus.id;

    this.amaService.updateTask(this.currentTask.id, req).subscribe({
      next:(data: Task) => {
        //this.currentTask = data;
        }, 
      error:(error: any)=>{this.messageService.add({severity:'error', summary: 'Failed to close task', detail: error});},
      complete:() => {
        this.messageService.add({severity:'success', summary: 'Task closed', detail: this.currentTask.name});
        this.fetchCurrentTask(this.currentTask.id);
      }
    });
  }

  archiveTask(){
    const newStatus = this.statuses.find(x => x.name == "Archived");
    var req = new RequestUpdateTask();
    req.statusId = newStatus.id;

    this.amaService.updateTask(this.currentTask.id, req).subscribe({
      next:(data: Task) => {
        //this.currentTask = data;
        }, 
      error:(error: any)=>{this.messageService.add({severity:'error', summary: 'Failed to archive task', detail: error});},
      complete:() => {
        this.messageService.add({severity:'success', summary: 'Task archived', detail: this.currentTask.name});
        this.fetchCurrentTask(this.currentTask.id);
      }
    });
  }
}
