import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HighlightJsConfig, HIGHLIGHTJS_CONFIG } from 'ngx-highlight-js';

bootstrapApplication(AppComponent, {
  providers: [{ provide: HIGHLIGHTJS_CONFIG, useValue: { lang: 'html' } as HighlightJsConfig }],
}).catch((err) => console.error(err));
