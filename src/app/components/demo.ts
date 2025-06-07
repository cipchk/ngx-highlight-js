import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightJsDirective } from 'ngx-highlight-js';
import codeHtml from './files/code';

const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

@Component({
  selector: 'demo',
  templateUrl: './demo.html',
  imports: [FormsModule, HighlightJsDirective],
})
export class Demo implements OnInit {
  switchStatus = true;
  html = `<textarea highlight-js [lang]="'html'" [ngModel]="html"></textarea>`;
  random = ``;
  code = codeHtml;

  private getHtml(): string {
    const DATA = [`<a href="">1</a>`, `<div>2</div>`, `<span>3</span>`, `<i>4</i>`, `<p>5</p>`];
    return DATA[r(0, DATA.length - 1)];
  }

  updateHTML(): void {
    this.html = this.getHtml();
  }

  randomHtml(): void {
    this.random = this.getHtml();
  }

  ngOnInit(): void {
    this.randomHtml();
  }
}
