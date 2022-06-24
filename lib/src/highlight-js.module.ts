import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightJsDirective } from './highlight-js.directive';

const DIRECTIVES = [HighlightJsDirective];

@NgModule({
  imports: [FormsModule, ...DIRECTIVES],
  exports: DIRECTIVES,
})
export class HighlightJsModule {}
