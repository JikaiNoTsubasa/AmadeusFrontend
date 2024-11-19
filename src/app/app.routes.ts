import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AppComponent } from './app.component';
import { ProjectComponent } from './pages/project/project.component';
import { MainComponent } from './pages/main/main.component';
import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/main', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'logout', component: LogoutComponent
    },
    {
        path: 'unit/:id', component: ProjectComponent
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [authGuard]
    },
    {
        path: 'main', component: MainComponent, canActivate: [authGuard]
    }
];
