import { Directive, Component, ElementRef, Input, OnInit, OnDestroy } from "@angular/core";

declare const hljs: any;
declare const document: any;

@Directive({
    selector: '[highlight-js]',
    host: {
        'style': 'display:none;'
    }
})
export class HighlightJsDirective implements OnInit, OnDestroy {

    @Input() options: any;
    @Input() lang: string;

    protected codeEl: any;
    protected parentEl: any;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.codeEl = document.createElement('pre');
        if (this.lang) {
            this.codeEl.className = this.lang;
        }
        this.codeEl.innerHTML = '' + this.elementRef.nativeElement.innerHTML.trim();
        this.parentEl = this.elementRef.nativeElement.parentNode;
        this.parentEl.insertBefore(this.codeEl, this.elementRef.nativeElement.nextSibling);

        hljs.configure(Object.assign({ }, this.options));
        hljs.highlightBlock(this.codeEl);
    }
    
    ngOnDestroy(): void {
        if (this.codeEl) {
            this.parentEl.removeChild(this.codeEl);
            this.codeEl = null;
        }
    }
}
