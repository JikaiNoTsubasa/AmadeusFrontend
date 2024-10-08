import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AmaService } from '../services/AmaService';
import { Unit } from '../Models/Unit';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProjectComponent } from "../pages/project/project.component";

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule, ProjectComponent],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {

  amaService = inject(AmaService);
  authService = inject(AuthService);
  router = inject(Router);

  appName = "Amadeus";
  @ViewChild('mysidenav')
  public sidenav: ElementRef;
  @ViewChild('mymain') 
  mainref : ElementRef;

  selectedUnit : Unit = null;

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
        //console.log('complete');
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
      //console.log("closing");
      this.sidebarOpened = false;
    }else{
      this.openNav();
      //console.log("opening");
      this.sidebarOpened = true;
    }
  }

  onClickUnit(unit: Unit){
    this.selectedUnit = unit;
  }
}