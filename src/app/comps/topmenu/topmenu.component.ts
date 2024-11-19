import { Component, inject } from '@angular/core';
import { User } from '../../Models/User';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-topmenu',
  standalone: true,
  imports: [],
  templateUrl: './topmenu.component.html',
  styleUrl: './topmenu.component.scss'
})
export class TopmenuComponent {

  authService = inject(AuthService);

  user: User;

  ngOnInit(){
    this.user = this.authService.getAuthUser();
  }
}
