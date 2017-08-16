import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalRModule } from 'ng2-signalr';

import { AppComponent } from './app.component';
import { TestSignalrComponent } from './signalr/test-signalr.component';

import { createConfig } from './signalr/config-signalr';

@NgModule({
  declarations: [
    AppComponent,
    TestSignalrComponent
  ],
  imports: [
    BrowserModule,
    SignalRModule.forRoot(createConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
