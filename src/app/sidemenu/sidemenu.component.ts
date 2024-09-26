import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AmaService } from '../services/AmaService';
import { Unit } from '../Models/Unit';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {

  constructor(private amaService: AmaService) { }

  appName = "Amadeus";
  @ViewChild('mysidenav')
  public sidenav: ElementRef;
  @ViewChild('mymain') 
  mainref : ElementRef;

  selectedUnit = null;

  units: Unit[] = [];

  sidebarOpened = true;

  ngOnInit(){
    this.getAllUnits();
  }

  getAllUnits(){
    this.amaService.getAllUnits().subscribe({
      next:(data) => {
        this.units = data;
        }, 
      error:(error)=>{
        console.log(error);
        },
      complete:() => {
        console.log('complete');
        }
  });
  }

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