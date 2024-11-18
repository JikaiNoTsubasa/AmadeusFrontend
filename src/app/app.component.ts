import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Amadeus';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
  /*
  appName = "Amadeus";
  @ViewChild('mysidenav')
  public sidenav: ElementRef;
  @ViewChild('mymain') 
  mainref : ElementRef;

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
      //console.log("closing");
      this.sidebarOpened = false;
    }else{
      this.openNav();
      //console.log("opening");
      this.sidebarOpened = true;
    }
  }
    */
}
