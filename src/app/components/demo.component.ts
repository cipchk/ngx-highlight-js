import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  switchStatus = true;
  html = `<textarea highlight-js [lang]="'html'" [ngModel]="html"></textarea>`;

  updateHTML() {
    this.html = `<span></span>`;
  }
}
