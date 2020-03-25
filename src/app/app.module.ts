import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightJsModule } from 'ngx-highlight-js';

import { AppComponent } from './app.component';
import { DemoComponent } from './components/demo.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HighlightJsModule],
  declarations: [AppComponent, DemoComponent],
  bootstrap: [AppComponent],
})
export class AppDemoModule {}
