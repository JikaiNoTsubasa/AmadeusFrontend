import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// https://www.techiediaries.com/auth-login-signup-angular-18/
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
