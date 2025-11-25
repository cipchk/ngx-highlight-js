import { Directive, ElementRef, OnDestroy, input, model, inject, afterNextRender } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgModel } from '@angular/forms';
import { HIGHLIGHTJS_CONFIG } from './config';
import type { HLJSApi, HLJSOptions } from 'highlight.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

declare const ngDevMode: boolean;

@Directive({
  selector: '[highlight-js]',
  host: {
    '[style.display]': `mode() === 'simple' ? 'none' : null`,
  },
  exportAs: 'highlightJs',
})
export class HighlightJsDirective implements OnDestroy {
  private readonly cog = inject(HIGHLIGHTJS_CONFIG, { optional: true });
  readonly options = input<Partial<HLJSOptions>>(this.cog?.options ?? {});
  readonly lang = input<string>(this.cog?.lang ?? 'html');
  readonly code = model<string>();
  readonly mode = input<'default' | 'simple'>(this.cog?.mode ?? 'simple');

  protected codeEl?: HTMLElement;
  protected parentEl?: HTMLElement;
  private observer?: MutationObserver;
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngModel = inject<NgModel>(NgModel, { optional: true });
  private readonly doc = inject(DOCUMENT);

  constructor() {
    this.ngModel?.valueChanges?.pipe(takeUntilDestroyed()).subscribe((res) => {
      this.code.set(this.escapeHTML(res));
      this.init();
    });

    afterNextRender(() => {
      this.init();

      if (!this.ngModel) {
        this.initMutation();
      }
    });
  }

  private escapeHTML(str: string): string {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  private init(): void {
    this.destroy();
    const el = this.el.nativeElement;
    const code = this.code() ?? '' + el.innerHTML.trim();
    const doc = this.doc as Document;
    this.codeEl = doc.createElement(this.mode() === 'default' ? 'div' : 'pre') as HTMLElement;
    if (this.codeEl == null) return;

    const isSimple = this.mode() === 'simple';
    if (isSimple) {
      const lang = this.lang();
      if (lang) {
        this.codeEl.className = lang;
      }
      this.parentEl = el.parentNode as HTMLElement;
      this.parentEl.insertBefore(this.codeEl, el.nextSibling);
    } else {
      this.parentEl = el;
      this.parentEl.innerHTML = ``;
      this.parentEl.appendChild(this.codeEl);
    }
    this.codeEl.innerHTML = code;
    const hljs: HLJSApi = (doc.defaultView as any).hljs;
    if (hljs == null) {
      if (typeof ngDevMode === 'undefined' || ngDevMode) {
        console.warn(`Can't find hljs under window`);
      }
      return;
    }

    hljs.configure({ ...this.options() });

    if (isSimple) {
      hljs.highlightElement(this.codeEl);
    } else {
      this.codeEl.querySelectorAll<HTMLElement>(this.options()?.cssSelector ?? 'pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }

  private destroy(): void {
    if (this.codeEl && this.parentEl) {
      this.parentEl.removeChild(this.codeEl);
      this.codeEl = undefined;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
    this.observer?.disconnect();
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
}
