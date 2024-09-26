import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list'; 
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidemenuComponent],//, MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, BrowserModule, BrowserAnimationsModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Amadeus';
}
