import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { App } from './app/app';
import { provideHighlightJsConfig } from 'ngx-highlight-js';

bootstrapApplication(App, {
  providers: [provideHighlightJsConfig({ lang: 'html' }), provideZonelessChangeDetection()],
}).catch((err) => console.error(err));
