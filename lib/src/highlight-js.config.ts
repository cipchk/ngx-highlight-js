import { InjectionToken } from '@angular/core';
import type { HLJSOptions } from 'highlight.js';

export interface HighlightJsConfig {
  /**
   * Specify rendering mode
   * - `default` Will render each `<pre><code>`
   * - `simple` Render all content according to `lang` language
   */
  mode?: 'default' | 'simple';
  /**
   * Uses language detection by default but you can specify the language
   */
  lang?: string;
  /**
   * Equar [configure(options)](https://highlightjs.readthedocs.io/en/latest/api.html#configure)
   */
  options?: Partial<HLJSOptions>;
}

export const HIGHLIGHTJS_CONFIG = new InjectionToken<HighlightJsConfig>('HighlightJs-Config');
