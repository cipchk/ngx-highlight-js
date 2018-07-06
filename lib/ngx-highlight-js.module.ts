import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightJsDirective } from './components/highlight-js.directive';

@NgModule({
  imports: [FormsModule],
  declarations: [HighlightJsDirective],
  exports: [HighlightJsDirective]
})
export class HighlightJsModule {
}
