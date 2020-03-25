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

  private getHtml(): string {
    const DATA = [
      `<a href="">1</a>`,
      `<div>2</div>`,
      `<span>3</span>`,
      `<i>4</i>`,
      `<p>5</p>`,
    ];
    return DATA[r(0, DATA.length - 1)];
  }

  updateHTML() {
    this.html = this.getHtml();
  }

  randomHtml() {
    this.random = this.getHtml();
  }
}
