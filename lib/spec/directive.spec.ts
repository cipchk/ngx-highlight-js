import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOCUMENT } from '@angular/common';
import { HighlightJsDirective } from 'lib/public-api';

describe('Component: ngx-highlight-js', () => {
  let fixture: ComponentFixture<any>;
  let context: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });
  });

  function createComp() {
    fixture = TestBed.createComponent(TestComponent);
    context = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should be working', () => {
    createComp();
    const rootEl = fixture.nativeElement as HTMLDivElement;
    const el = rootEl.querySelector('textarea') as HTMLTextAreaElement;
    expect(el.style.display).toBe('none');
    const hljsEl = rootEl.querySelector('.hljs') as HTMLDivElement;
    expect(hljsEl != null).toBe(true);
    expect(hljsEl.classList).toContain(`typescript`);
  });

  it(`can't load hljs in window`, () => {
    spyOn(console, 'warn');
    const doc = TestBed.inject(DOCUMENT);
    spyOnProperty(doc as any, 'defaultView').and.returnValue({});
    createComp();
    expect(console.warn).toHaveBeenCalled();
  });
});

@Component({
  selector: 'ngx-highlight-js-test',
  template: `
    <textarea [highlight-js] [options]="{}" [lang]="'typescript'">
import { Component } from '@angular/core';
</textarea>
  `,
  imports: [HighlightJsDirective],
})
class TestComponent {}
