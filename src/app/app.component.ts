import { Component, ViewEncapsulation } from '@angular/core';
import { DemoComponent } from './components/demo.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>ngx-highlight-js</h1>
    <p>Angular for syntax highlighting with highlight.js</p>
    <demo></demo>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DemoComponent],
})
export class AppComponent {}
