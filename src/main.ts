import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHighlightJsConfig } from 'ngx-highlight-js';

bootstrapApplication(App, {
  providers: [provideHighlightJsConfig({ lang: 'html' })],
}).catch((err) => console.error(err));
