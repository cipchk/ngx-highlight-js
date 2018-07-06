import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  ContentChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgModel } from '@angular/forms';

declare const hljs: any;

@Directive({
  selector: '[highlight-js]',
  host: {
    style: 'display:none;',
  },
})
export class HighlightJsDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() options: any;
  @Input() lang: string;
  @Input() code: string;
  @ContentChild(NgModel) private readonly ngModel: NgModel;

  protected codeEl: any;
  protected parentEl: any;

  private escapeHTML(str: string): string {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private init() {
    this.destroy();
    this.codeEl = this.doc.createElement('pre');
    if (this.lang) {
      this.codeEl.className = this.lang;
    }
    this.codeEl.innerHTML =
      this.code || '' + this.el.nativeElement.innerHTML.trim();
    this.parentEl = this.el.nativeElement.parentNode;
    this.parentEl.insertBefore(this.codeEl, this.el.nativeElement.nextSibling);

    hljs.configure(Object.assign({}, this.options));
    hljs.highlightBlock(this.codeEl);
  }

  private destroy() {
    if (this.codeEl) {
      this.parentEl.removeChild(this.codeEl);
      this.codeEl = null;
    }
  }

  constructor(
    private el: ElementRef,
    @Inject(DOCUMENT) private doc: any,
  ) {}

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit(): void {
    if (this.ngModel) {
      this.ngModel.valueChanges.subscribe(res => {
        this.code = this.escapeHTML(res);
        this.init();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
