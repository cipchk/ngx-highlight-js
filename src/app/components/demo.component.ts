import { Component } from '@angular/core';

const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  switchStatus = true;
  html = `<textarea highlight-js [lang]="'html'" [ngModel]="html"></textarea>`;
  random = ``;

  updateHTML() {
    this.html = `<span></span>`;
  }

  randomHtml() {
    const DATA = [
      `<a href="">1</a>`,
      `<div>1</div>`,
      `<span>1</span>`,
      `<i>1</i>`,
      `<p>1</p>`,
    ];
    this.random = DATA[r(0, DATA.length - 1)];
  }
}
