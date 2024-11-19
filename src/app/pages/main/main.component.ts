import { Component, inject } from '@angular/core';
import { AmaService } from '../../services/AmaService';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from '../../sidemenu/sidemenu.component';
import { TopmenuComponent } from '../../comps/topmenu/topmenu.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, SidemenuComponent, TopmenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  amaService = inject(AmaService);

  ngOnInit() {
  }
}
