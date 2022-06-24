import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightJsModule } from '../src/highlight-js.module';

const html = ``;

describe('Component: ngx-highlight-js', () => {
  let fixture: ComponentFixture<any>;
  let context: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HighlightJsModule],
    });
    fixture = TestBed.createComponent(TestComponent);
    context = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be working', () => {
    const rootEl = fixture.nativeElement as HTMLDivElement;
    const el = rootEl.querySelector('textarea') as HTMLTextAreaElement;
    expect(el.style.display).toBe('none');
    const hljsEl = rootEl.querySelector('.hljs') as HTMLDivElement;
    expect(hljsEl != null).toBe(true);
    expect(hljsEl.classList).toContain(`typescript`);
  });
});

@Component({
  selector: 'ngx-highlight-js-test',
  template: `
    <textarea [highlight-js] [options]="{}" [lang]="'typescript'">
import { Component } from '@angular/core';
</textarea>
  `,
})
class TestComponent {}
