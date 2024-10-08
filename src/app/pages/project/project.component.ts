import { Component, Input } from '@angular/core';
import { Unit } from '../../Models/Unit';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  @Input() unit : Unit = null;
}
