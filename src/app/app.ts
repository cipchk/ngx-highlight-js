import { Component } from '@angular/core';
import { Demo } from './components/demo';

@Component({
  selector: 'app-root',
  template: `
    <h1>ngx-highlight-js</h1>
    <p>Angular for syntax highlighting with highlight.js</p>
    <demo></demo>
  `,
  imports: [Demo],
})
export class App { }
