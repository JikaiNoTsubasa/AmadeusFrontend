import { Component, inject, Input } from '@angular/core';
import { Unit } from '../../Models/Unit';
import { AmaService } from '../../services/AmaService';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StatusColorPipe } from "../../pipe/status-color.pipe";
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-project',
  standalone: true,
  //imports: [CommonModule, StatusColorPipe, PanelModule, MenuModule ],
  imports: [CommonModule ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  selectedUnit : Unit = null;
  units: Unit[] = [];
  loading = true;

  amaService = inject(AmaService);
  route = inject(ActivatedRoute);



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
}
