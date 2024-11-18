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

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, StatusColorPipe, ProgressSpinnerModule, ChipModule, CardModule, ToolbarModule, ButtonModule, DialogModule, ReactiveFormsModule ],
  //imports: [CommonModule, RouterModule ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  selectedUnit : Unit = null;
  units: Unit[] = [];
  loading = true;

  amaService = inject(AmaService);
  route = inject(ActivatedRoute);

  editUnitDialogVisible: boolean = false;

  protected unitUpdateForm = new FormGroup({
    unitName: new FormControl(this.selectedUnit?.name, [Validators.required, Validators.email])
  })


  ngOnInit(){
    const id =this.route.snapshot.params['id'];
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

    this.amaService.getAllUnits().subscribe({
      next:(data) => {
        this.units = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        //console.log('complete');
        }
    });
  }

  ngOnChanges(){
    console.log("On change unit");
  }

  showEditUnitDialog(){
    this.editUnitDialogVisible = true;
  }

  submitUnitUpdate(){
    this.editUnitDialogVisible = false;
    if(this.unitUpdateForm.valid){
      console.log(this.unitUpdateForm.value);
    }
  }
}
