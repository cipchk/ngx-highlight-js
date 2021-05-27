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
    (window as any).hljs = {
      configure: jasmine.createSpy(),
      highlightBlock: jasmine.createSpy(),
    };
    fixture.detectChanges();
  });

  it('should be working', () => {
    const el = (fixture.nativeElement as HTMLElement).querySelector('textarea') as HTMLTextAreaElement;
    expect(el.style.display).toBe('none');
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
