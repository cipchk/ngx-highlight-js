# ngx-highlight-js

Angular for syntax highlighting with highlight.js

[![NPM version](https://img.shields.io/npm/v/ngx-highlight-js.svg)](https://www.npmjs.com/package/ngx-highlight-js)
[![Ci](https://github.com/cipchk/ngx-highlight-js/workflows/Ci/badge.svg)](https://github.com/cipchk/ngx-highlight-js/actions)
[![codecov](https://codecov.io/github/cipchk/ngx-highlight-js/graph/badge.svg?token=FI8lMVH3bN)](https://codecov.io/github/cipchk/ngx-highlight-js)

## Demo

- [Live Demo](https://cipchk.github.io/ngx-highlight-js/)
- [Stackblitz](https://stackblitz.com/edit/ngx-highlight-js)

## Installation instructions

### 1、Install

```
npm install --save ngx-highlight-js
```

### 2、Add highlight.js

Load the [highlight.js](https://highlightjs.org/download/) and theme css in page.

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/atom-one-dark.min.css" />
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
```

## Usage

```typescript
import { Component } from '@angular/core';
import { HighlightJsDirective } from 'ngx-highlight-js';

@Component({
  selector: 'test',
  template: `<textarea highlight-js [lang]="'bash'">npm install --save ngx-highlight-js</textarea>`,
  imports: [HighlightJsDirective]
})
export class SimpleComponent {}
```

### Simple mode

```html
<textarea highlight-js [options]="{}" [lang]="'typescript'">
/* tslint:disable */
import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  switchStatus: boolean = true;
}
</textarea>
```

### Default mode

Will render each `<pre><code>`:

```html
<textarea highlight-js mode="default">
  <p>
    The bare minimum for using highlight.js on a web page is linking to the library along with one of the styles and calling
    <a href="http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload"><code>initHighlightingOnLoad</code></a
    >:
  </p>
  <pre><code class="language-html">&lt;link rel=&quot;stylesheet&quot; href=&quot;/path/to/styles/default.css&quot;&gt;
  &lt;script src=&quot;/path/to/highlight.min.js&quot;&gt;&lt;/script&gt;
  &lt;script&gt;hljs.initHighlightingOnLoad();&lt;/script&gt;
  </code></pre>
  <p>
    This will find and highlight code inside of <code>&lt;pre&gt;&lt;code&gt;</code> tags; it tries to detect the language automatically. If
    automatic detection doesn’t work for you, you can specify the language in the <code>class</code> attribute:
  </p>
  <pre><code class="language-html">&lt;pre&gt;&lt;code class=&quot;html&quot;&gt;...&lt;/code&gt;&lt;/pre&gt;
  </code></pre>
</textarea>
```

### Parameter

| Property    | Description                                                                                              | Type              | Default  | Global Config |
| ----------- | -------------------------------------------------------------------------------------------------------- | ----------------- | -------- | ------------- |
| `[mode]`    | - `default` Will render each `<pre><code>`<br>- `simple` Render all content according to `lang` language | `default, simple` | `simple` | ✅            |
| `[options]` | Equar [configure(options)](https://highlightjs.readthedocs.io/en/latest/api.html#configure)              | `any`             | -        | ✅            |
| `[lang]`    | Uses language detection by default but you can specify the language                                      | `string`          | `html`   | ✅            |
| `[code]`    | Specify content                                                                                          | `string`          | `html`   | -             |

**Global Config**

```ts
@NgModule({
  providers: [provideHighlightJsConfig({ lang: 'html' })]
})
export class AppDemoModule {}
```

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-highlight-js/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-highlight-js/blob/master/LICENSE) file for the full text)
