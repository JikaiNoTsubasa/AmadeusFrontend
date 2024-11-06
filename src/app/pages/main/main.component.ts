import { Component, inject } from '@angular/core';
import { AmaService } from '../../services/AmaService';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  amaService = inject(AmaService);

  ngOnInit() {
  }
}
