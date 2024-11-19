import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
