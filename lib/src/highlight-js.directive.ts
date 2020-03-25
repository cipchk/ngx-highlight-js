import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Inject,
  Optional,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

declare const hljs: any;

@Directive({
  selector: '[highlight-js]',
  host: {
    style: 'display:none;',
  },
  exportAs: 'highlightJs',
})
export class HighlightJsDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() options: any;
  @Input() lang = 'html';
  @Input() code: string;

  protected codeEl: HTMLElement;
  protected parentEl: HTMLElement;
  private modelValue$: Subscription;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Optional() private ngModel: NgModel,
    @Inject(DOCUMENT) private doc: any,
  ) {}

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
    this.parentEl = this.el.nativeElement.parentNode as HTMLElement;
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

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    if (this.ngModel) {
      this.modelValue$ = this.ngModel.valueChanges.subscribe(res => {
        this.code = this.escapeHTML(res);
        this.init();
      });
    } else {
      this.initMutation();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
    this.destroyMutation();
    if (this.modelValue$) {
      this.modelValue$.unsubscribe();
    }
  }

  // #region Mutation

  private observer: MutationObserver;
  private initMutation() {
    if (typeof MutationObserver === 'undefined') return;
    this.observer = new MutationObserver(this.init.bind(this));
    this.observer.observe(this.el.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  private destroyMutation() {
    if (!this.observer) return;
    this.observer.disconnect();
  }

  // #endregionn
}
