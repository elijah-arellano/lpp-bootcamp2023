import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  /* All the UI entities (component, directive, pipe) */
  declarations: [
    AppComponent
  ],
  /* All the dependency modules  */
  imports: [
    BrowserModule
  ],
  /* All the NON-UI entities (services) */
  providers: [],

  /* top level components */
  bootstrap: [AppComponent]
})
export class AppModule { }