import { Directive, ElementRef, Input, OnDestroy, AfterViewInit, Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HighlightJsConfig, HIGHLIGHTJS_CONFIG } from './highlight-js.config';

declare const hljs: any;

@Directive({
  selector: '[highlight-js]',
  host: {
    '[style.display]': `mode === 'simple' ? 'none' : null`,
  },
  exportAs: 'highlightJs',
})
export class HighlightJsDirective implements AfterViewInit, OnDestroy {
  @Input() options: any;
  @Input() lang = 'html';
  @Input() code!: string;
  @Input() mode: 'default' | 'simple' = 'simple';

  protected codeEl?: HTMLElement;
  protected parentEl!: HTMLElement;
  private modelValue$?: Subscription;
  private observer!: MutationObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Optional() private ngModel: NgModel,
    @Inject(DOCUMENT) private doc: any,
    @Optional() @Inject(HIGHLIGHTJS_CONFIG) cog: HighlightJsConfig,
  ) {
    Object.assign(this, cog);
  }

  private escapeHTML(str: string): string {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  private init(): void {
    this.destroy();
    const el = this.el.nativeElement;
    const code = this.code || '' + el.innerHTML.trim();
    this.codeEl = this.doc.createElement(this.mode === 'default' ? 'div' : 'pre') as HTMLElement;
    const isSimple = this.mode === 'simple';
    if (isSimple) {
      if (this.lang) {
        this.codeEl.className = this.lang;
      }
      this.parentEl = el.parentNode as HTMLElement;
      this.parentEl.insertBefore(this.codeEl, el.nextSibling);
    } else {
      this.parentEl = el;
      this.parentEl.innerHTML = ``;
      this.parentEl.appendChild(this.codeEl);
    }
    this.codeEl.innerHTML = code;
    hljs.configure({ ...this.options });

    if (isSimple) {
      hljs.highlightBlock(this.codeEl);
    } else {
      this.codeEl.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }

  private destroy(): void {
    if (this.codeEl && this.parentEl) {
      this.parentEl.removeChild(this.codeEl);
      this.codeEl = undefined;
    }
  }

  ngAfterViewInit(): void {
    this.init();
    if (this.ngModel) {
      this.modelValue$ = this.ngModel.valueChanges?.subscribe((res) => {
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

  private initMutation(): void {
    if (typeof MutationObserver === 'undefined') {
      return;
    }
    this.observer = new MutationObserver(this.init.bind(this));
    this.observer.observe(this.el.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  private destroyMutation(): void {
    if (!this.observer) {
      return;
    }
    this.observer.disconnect();
  }
}
