import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleModule, ResourceDirective, ResourcesDirective } from '@syncfusion/ej2-angular-schedule';
import { MeetingComponent } from './meeting/meeting.component';
// import { ToastrModule } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      closeButton: true,
      progressBar: true,
    })
  ],
  providers: [ResourceDirective,ResourcesDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
