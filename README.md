# ngx-highlight-js
Angular for syntax highlighting with highlight.js

[![NPM version](https://img.shields.io/npm/v/ngx-highlight-js.svg)](https://www.npmjs.com/package/ngx-highlight-js)
[![Build Status](https://travis-ci.org/cipchk/ngx-highlight-js.svg?branch=master)](https://travis-ci.org/cipchk/ngx-highlight-js)


## Demo

[Live Demo](https://cipchk.github.io/ngx-highlight-js/)

## Installation instructions

### 1、Install

```
npm install --save ngx-highlight-js
```

Import the `HighlightJsModule` in to your root `AppModule`.

```typescript
import { HighlightJsModule } from 'ngx-highlight-js';
@NgModule({
  imports: [ HighlightJsModule ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### 2、Add highlight.js

Load the highlight.js and theme css in page.

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js"></script>
```

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/atom-one-dark.min.css">
```

## Only `<textarea>` Tag

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

**[options]** equar [configure(options)](http://highlightjs.readthedocs.io/en/latest/api.html#configure-options). (optional)

**[lang]** uses language detection by default but you can specify the language. (optional)

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-highlight-js/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-highlight-js/blob/master/LICENSE) file for the full text)
