import { Directive, Component, ElementRef, Input, OnInit, OnDestroy, AfterViewChecked } from "@angular/core";
declare var hljs: any;
declare var document: any;

@Directive({
    selector: '[highlight-js]',
    host: {
        'style': 'display:none;'
    }
})
export class HighlightJsDirective implements OnInit, OnDestroy, AfterViewChecked {

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
    }

    ngAfterViewChecked() {
        hljs.highlightBlock(this.codeEl);
    }
    
    ngOnDestroy(): void {
        if (this.codeEl) {
            this.parentEl.removeChild(this.codeEl);
            this.codeEl = null;
        }
    }
}
