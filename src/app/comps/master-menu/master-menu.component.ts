import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';

@Component({
  selector: 'app-master-menu',
  standalone: true,
  imports: [ CommonModule, MenubarModule, BadgeModule, AvatarModule, MegaMenuModule ],
  templateUrl: './master-menu.component.html',
  styleUrl: './master-menu.component.scss'
})
export class MasterMenuComponent {

  items : MegaMenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
    },
    {
      label: 'File',
    },
    {
      label: 'Edit',
    }
  ];

  OnNgInit(){
  }
}
