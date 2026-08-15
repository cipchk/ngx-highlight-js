import { TestBed } from '@angular/core/testing';

import { HIGHLIGHTJS_CONFIG, provideHighlightJsConfig } from './config';

describe('config', () => {
  it('should provide config merged with provided lang', () => {
    TestBed.configureTestingModule({
      providers: [provideHighlightJsConfig({ lang: 'typescript' })]
    });
    const config = TestBed.inject(HIGHLIGHTJS_CONFIG);
    expect(config.lang).toBe('typescript');
  });

  it('should fallback lang to html when not provided', () => {
    TestBed.configureTestingModule({
      providers: [provideHighlightJsConfig({ options: { cssSelector: 'code' } })]
    });
    const config = TestBed.inject(HIGHLIGHTJS_CONFIG);
    expect(config.lang).toBe('html');
    expect(config.options).toEqual({ cssSelector: 'code' });
  });
});
