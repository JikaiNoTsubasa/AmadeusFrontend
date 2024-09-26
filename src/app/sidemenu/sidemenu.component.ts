import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../services/DataService';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {

  constructor(private dataService: DataService) { }

  appName = "Amadeus";
  @ViewChild('mysidenav')
  public sidenav: ElementRef;
  @ViewChild('mymain') 
  mainref : ElementRef;

  selectedUnit = null;

  sidebarOpened = true;

  openNav(){
    this.sidenav.nativeElement.style.width = "250px";
    this.mainref.nativeElement.style.marginLeft = "250px";
  }

  closeNav() {
    this.sidenav.nativeElement.style.width = "0";
    this.mainref.nativeElement.style.marginLeft = "0";
  }

  toggleNav() {
    if (this.sidebarOpened){
      this.closeNav();
      console.log("closing");
      this.sidebarOpened = false;
    }else{
      this.openNav();
      console.log("opening");
      this.sidebarOpened = true;
    }
  }
}