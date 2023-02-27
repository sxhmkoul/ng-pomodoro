import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkIntervalComponent } from './components/work-interval/work-interval.component';
import { BreakIntervalComponent } from './components/break-interval/break-interval.component';
import { TimerComponent } from './components/timer/timer.component';
import { AnimateDirective } from './animate.directive';

@NgModule({
  declarations: [
    AppComponent,
    WorkIntervalComponent,
    BreakIntervalComponent,
    TimerComponent,
    AnimateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
