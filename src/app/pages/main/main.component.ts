import { Component, inject } from '@angular/core';
import { AmaService } from '../../services/AmaService';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { MasterMenuComponent } from "../../comps/master-menu/master-menu.component";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MenubarModule, BadgeModule, AvatarModule, MasterMenuComponent, InputTextModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  amaService = inject(AmaService);

  ngOnInit() {
  }
}
