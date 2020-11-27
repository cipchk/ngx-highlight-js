import { InjectionToken } from '@angular/core';

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
   * Equar [configure(options)](http://highlightjs.readthedocs.io/en/latest/api.html#configure-options)
   */
  options?: any;
}

export const HIGHLIGHTJS_CONFIG = new InjectionToken<HighlightJsConfig>('HighlightJs-Config');
