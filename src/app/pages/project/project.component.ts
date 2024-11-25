import { Component, inject, Input } from '@angular/core';
import { Unit } from '../../Models/Unit';
import { AmaService } from '../../services/AmaService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StatusColorPipe } from "../../pipe/status-color.pipe";
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
import { Project } from '../../Models/Project';
import { RequestCreateProject } from '../../Models/DTO/RequestCreateProject';
import { Status } from '../../Models/Status';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, ChipModule, CardModule, ToolbarModule, ButtonModule, DialogModule, ReactiveFormsModule, SidemenuComponent, TopmenuComponent, SidebarModule, InputTextModule, DropdownModule, MenuModule, MenubarModule ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  selectedUnit : Unit = null;
  projects : Project[] = [];
  loading = true;

  amaService = inject(AmaService);
  route = inject(ActivatedRoute);

  statuses : Status[] = [];

  editUnitDialogVisible: boolean = false;
  createProjectDialogVisible: boolean = false;

  // Project Menu
  projectMenuItems : MenuItem[] = [
    {label: 'Actions', items: [
      {label: 'Create Project', icon: 'pi pi-plus', command: () => {this.showCreateProjectDialog();}},
      {label: 'Edit Unit', icon: 'pi pi-pencil', command: () => {this.showEditUnitDialog();}}
    ]},
    
  ];

  protected unitUpdateForm = new FormGroup({
    unitName: new FormControl(this.selectedUnit?.name, [Validators.required, Validators.email])
  });

  protected projectCreateForm = new FormGroup({
    projectName: new FormControl('', [Validators.required, Validators.requiredTrue]),
    projectDesc: new FormControl(),
    projectStatus: new FormControl('', [Validators.required, Validators.requiredTrue])
  });


  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.amaService.getUnit(id).subscribe({
      next:(data) => {
        this.selectedUnit = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        this.loading = false;
        //console.log('complete');
        }
    });

    this.amaService.getAllStatuses().subscribe({
      next:(data) => {
        this.statuses = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        //console.log('complete');
        }
    });

    this.amaService.getAllProjects().subscribe({
      next:(data) => {
        this.projects = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        //console.log('complete');
        }
    })
  }

  ngOnChanges(){
    console.log("On change unit");
  }

  showEditUnitDialog(){
    this.editUnitDialogVisible = true;
  }

  showCreateProjectDialog(){
    this.createProjectDialogVisible = true;
  }

  submitUnitUpdate(){
    this.editUnitDialogVisible = false;
    if(this.unitUpdateForm.valid){
      console.log(this.unitUpdateForm.value);
    }
  }

  submitProjectCreate(){
    this.createProjectDialogVisible = false;
    var req : RequestCreateProject = new RequestCreateProject();
    req.name = this.projectCreateForm.value.projectName ?? "Default project";
    req.description = this.projectCreateForm.value.projectDesc ?? "";
    req.unitId = this.selectedUnit.id;
    console.log(req);

    this.amaService.createProject(req).subscribe({

      next:(data) => {
        console.log(data);
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        console.log('complete');
        }
    });
  }

  openProject(prjId:number){
    
  }
}
