import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AmaService } from '../services/AmaService';
import { Unit } from '../Models/Unit';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {

  amaService = inject(AmaService);
  authService = inject(AuthService);
  
  units: Unit[] = [];
  loading = true;

  user : User;

  ngOnInit(){
    this.getCurrentUser();
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

  getCurrentUser(){
    this.user = this.authService.getAuthUser();
  }

}