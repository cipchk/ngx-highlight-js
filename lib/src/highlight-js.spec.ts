import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HighlightJsDirective } from './highlight-js';

describe('Component: ngx-highlight-js', () => {
  let fixture: ComponentFixture<any>;

  function view(): any {
    return TestBed.inject(DOCUMENT).defaultView as any;
  }

  function setup(component: any, withHljs: boolean): void {
    TestBed.configureTestingModule({
      imports: [component]
    });
    if (withHljs) {
      view().hljs = { configure: vi.fn(), highlightElement: vi.fn() };
    } else {
      view().hljs = undefined;
    }
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
  }

  afterEach(() => {
    try {
      view().hljs = undefined;
    } catch {
      // TestBed 已重置，忽略
    }
  });

  it('should be working', () => {
    setup(TestComponent, false);
    const rootEl = fixture.nativeElement as HTMLDivElement;
    const el = rootEl.querySelector('textarea') as HTMLTextAreaElement;
    expect(el.style.display).toBe('none');
  });

  it(`can't load hljs in window`, () => {
    vi.spyOn(console, 'warn');
    setup(TestComponent, false);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should render in simple mode with hljs present', () => {
    setup(SimpleComponent, true);
    const hljs = view().hljs;
    const rootEl = fixture.nativeElement as HTMLDivElement;
    const textarea = rootEl.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.style.display).toBe('none');
    const pre = textarea.nextElementSibling as HTMLPreElement;
    expect(pre).not.toBeNull();
    expect(pre.className).toBe('typescript');
    expect(pre.innerHTML).toContain('const a = 1');
    expect(hljs.configure).toHaveBeenCalledWith({});
    expect(hljs.highlightElement).toHaveBeenCalledWith(pre);

    fixture.destroy();
    expect(textarea.nextElementSibling).toBeNull();
  });

  it('should render in simple mode without lang', () => {
    setup(SimpleNoLangComponent, true);
    const rootEl = fixture.nativeElement as HTMLDivElement;
    const textarea = rootEl.querySelector('textarea') as HTMLTextAreaElement;
    const pre = textarea.nextElementSibling as HTMLPreElement;
    expect(pre).not.toBeNull();
    expect(pre.className).toBe('');
  });

  it('should render in default mode with hljs present', () => {
    setup(DefaultComponent, true);
    const hljs = view().hljs;
    const rootEl = fixture.nativeElement as HTMLDivElement;
    const div = rootEl.querySelector('div.host') as HTMLDivElement;
    const codeEl = div.firstElementChild as HTMLDivElement;
    expect(codeEl).not.toBeNull();
    expect(div.querySelectorAll('code').length).toBe(2);
    expect(hljs.configure).toHaveBeenCalledWith({ cssSelector: 'code' });
    expect(hljs.highlightElement).toHaveBeenCalledTimes(2);
  });

  it('should use default cssSelector in default mode', () => {
    setup(DefaultNoSelectorComponent, true);
    const hljs = view().hljs;
    const rootEl = fixture.nativeElement as HTMLDivElement;
    const div = rootEl.querySelector('div.no-selector') as HTMLDivElement;
    expect(div.querySelectorAll('pre code').length).toBe(1);
    expect(hljs.highlightElement).toHaveBeenCalledTimes(1);
  });

  it('should escape and render ngModel value', () => {
    setup(ModelComponent, true);
    const hljs = view().hljs;

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = `<a href="x">&amp;</a>`;
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const pre = textarea.nextElementSibling as HTMLPreElement;
    expect(pre).not.toBeNull();
    expect(pre.textContent).toBe(`<a href="x">&amp;</a>`);
    expect(hljs.highlightElement).toHaveBeenCalled();

    // 清空 value → escapeHTML 的 falsy 分支
    textarea.value = '';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect((textarea.nextElementSibling as HTMLPreElement).textContent).toBe('');
  });

  it('should handle missing MutationObserver', () => {
    vi.spyOn(console, 'warn');
    const original = globalThis.MutationObserver;
    (globalThis as any).MutationObserver = undefined;
    try {
      setup(TestComponent, false);
    } finally {
      (globalThis as any).MutationObserver = original;
    }
    expect(console.warn).toHaveBeenCalled();
  });

  it('should warn when ngDevMode is undefined', () => {
    vi.spyOn(console, 'warn');
    const original = (globalThis as any).ngDevMode;
    (globalThis as any).ngDevMode = undefined;
    try {
      setup(TestComponent, false);
    } finally {
      (globalThis as any).ngDevMode = original;
    }
    expect(console.warn).toHaveBeenCalled();
  });

  it('should bail when createElement returns null', () => {
    setup(ModelComponent, true);
    const doc = TestBed.inject(DOCUMENT);
    vi.spyOn(doc, 'createElement').mockReturnValue(null as any);

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    expect(() => {
      textarea.value = 'const a = 1;';
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }).not.toThrow();
  });
});

@Component({
  selector: 'ngx-highlight-js-test',
  template: `
    <textarea highlight-js [options]="{}" lang="typescript">
import { Component } from '@angular/core';
</textarea>
  `,
  imports: [HighlightJsDirective]
})
class TestComponent {}

@Component({
  selector: 'ngx-highlight-js-simple-test',
  template: `
    <textarea highlight-js lang="typescript">
const a = 1;
</textarea>
  `,
  imports: [HighlightJsDirective]
})
class SimpleComponent {}

@Component({
  selector: 'ngx-highlight-js-simple-nolang-test',
  template: `
    <textarea highlight-js lang="">
const a = 1;
</textarea>
  `,
  imports: [HighlightJsDirective]
})
class SimpleNoLangComponent {}

@Component({
  selector: 'ngx-highlight-js-default-test',
  template: `
    <div class="host" highlight-js mode="default" [options]="{ cssSelector: 'code' }">
      <pre><code>const a = 1</code></pre>
      <code>const b = 2</code>
    </div>
  `,
  imports: [HighlightJsDirective]
})
class DefaultComponent {}

@Component({
  selector: 'ngx-highlight-js-default-noselector-test',
  template: `
    <div class="no-selector" highlight-js mode="default">
      <pre><code>const a = 1</code></pre>
    </div>
  `,
  imports: [HighlightJsDirective]
})
class DefaultNoSelectorComponent {}

@Component({
  selector: 'ngx-highlight-js-model-test',
  template: `<textarea highlight-js lang="html" [(ngModel)]="model"></textarea>`,
  imports: [HighlightJsDirective, FormsModule]
})
class ModelComponent {
  model = `<div>hi &amp; bye</div>`;
}
