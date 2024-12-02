import { Component, inject } from '@angular/core';
import { AmaService } from '../../services/AmaService';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../Models/Project';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidemenuComponent } from '../../sidemenu/sidemenu.component';
import { TopmenuComponent } from '../../comps/topmenu/topmenu.component';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { Task } from '../../Models/Task';
import { MenuItem, MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Unit } from '../../Models/Unit';
import { RequestCreateTask } from '../../Models/DTO/RequestCreateTask';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ CommonModule, ProgressSpinnerModule, ChipModule, CardModule, ToolbarModule, ButtonModule, DialogModule, ReactiveFormsModule, SidemenuComponent, TopmenuComponent, SidebarModule, InputTextModule, DropdownModule, MenuModule, DividerModule, BreadcrumbModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  selectedProject : Project;
  unit: Unit;
  tasks: Task[] = [];
  amaService = inject(AmaService);
  route = inject(ActivatedRoute);
  messageService = inject(MessageService);
  router = inject(Router);

  loading = true;
  createTaskDialogVisible = false;

  // Project Menu
  projectMenuItems : MenuItem[] = [
    {label: 'Actions', items: [
      {label: 'Create Task', icon: 'pi pi-plus', command: () => {this.showCreateTaskDialog();}},
      {label: 'Edit Project', icon: 'pi pi-pencil'}
    ]},
    
  ];

  // Breadcrump
  breadcrumbItems: MenuItem[] = [];
  homeItem: MenuItem = {icon: 'pi pi-home', url: '/'};

  // Forms
  protected taskCreateForm = new FormGroup({
    taskName: new FormControl('', [Validators.required, Validators.requiredTrue]),
    taskContent: new FormControl()
  });
  
  ngOnInit(){
    const id = this.route.snapshot.params['id'];

    this.amaService.getProject(id).subscribe({
      next:(data) => {
        this.selectedProject = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        this.loading = false;

        // Update unit for this project
        this.updateUnit();

        // Update tasks list
        this.updateTaskList();
      }
    });
  }

  updateTaskList(){
    this.amaService.getTasksForProject(this.selectedProject.id).subscribe({
      next:(data) => {
        this.tasks = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        //console.log('complete');
        }
      });
  }
  
  updateUnit(){
    this.amaService.getUnitByProject(this.selectedProject.id).subscribe({
      next:(data) => {
        this.unit = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        // Update breadcrump
        this.breadcrumbItems = [
          {label: this.unit.name, url: '/unit/' + this.unit.id}, 
          {label: this.selectedProject.name, url: '/project/' + this.selectedProject.id}
        ];
        //this.messageService.add({severity:'success', summary: 'Unit loaded', detail: this.unit.name});
        }
      });
  }

  openTask(id:number){
    this.router.navigate(['/task/' + id]);
  }

  submitTaskCreate(){
    this.createTaskDialogVisible = false;
    var req : RequestCreateTask = new RequestCreateTask();
    req.Name = this.taskCreateForm.value.taskName;
    req.Content = this.taskCreateForm.value.taskContent;
    req.ProjectId = this.selectedProject.id;
    console.log(req);

    this.amaService.createTask(req).subscribe({

      next:(data) => {
        console.log(data);
        }, 
      error:(error)=>{
        this.messageService.add({severity:'error', summary: 'Failed to create task for project', detail: error});
        },
      complete:() => {
        this.messageService.add({severity:'success', summary: 'Task created for project', detail: this.selectedProject.name});
        this.updateTaskList();
        }
    });
  }

  showCreateTaskDialog(){
    this.createTaskDialogVisible = true;
  }
}
