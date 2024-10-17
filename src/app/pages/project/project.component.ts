import { Component, inject, Input } from '@angular/core';
import { Unit } from '../../Models/Unit';
import { AmaService } from '../../services/AmaService';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  @Input() unit : Unit = null;

  amaService = inject(AmaService);

  ngOnChanges(){
    console.log("On change unit");
  }
}
