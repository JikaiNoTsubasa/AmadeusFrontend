import { Component, inject } from '@angular/core';
import { AmaService } from '../../services/AmaService';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../Models/Project';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SidemenuComponent } from '../../sidemenu/sidemenu.component';
import { TopmenuComponent } from '../../comps/topmenu/topmenu.component';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { Task } from '../../Models/Task';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ CommonModule, ProgressSpinnerModule, ChipModule, CardModule, ToolbarModule, ButtonModule, DialogModule, ReactiveFormsModule, SidemenuComponent, TopmenuComponent, SidebarModule, InputTextModule, DropdownModule, MenuModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  selectedProject : Project;
  tasks: Task[] = [];
  amaService = inject(AmaService);
  route = inject(ActivatedRoute);

  loading = true;

  // Project Menu
  projectMenuItems : MenuItem[] = [
    {label: 'Actions', items: [
      {label: 'Create Project', icon: 'pi pi-plus'},
      {label: 'Edit Unit', icon: 'pi pi-pencil'}
    ]},
    
  ];
  
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
    });
  }
}
