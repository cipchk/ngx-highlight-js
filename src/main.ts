import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideSFConfig } from 'ngx-highlight-js';

bootstrapApplication(AppComponent, {
  providers: [provideSFConfig({ lang: 'html' })],
}).catch((err) => console.error(err));
