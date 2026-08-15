import { provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { provideHighlightJsConfig } from 'ngx-highlight-js';

import { App } from './app/app';

bootstrapApplication(App, {
  providers: [provideHighlightJsConfig({ lang: 'html' }), provideZonelessChangeDetection()]
}).catch(err => console.error(err));
