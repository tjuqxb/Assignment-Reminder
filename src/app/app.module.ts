import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookPanelComponent } from './book-panel/book-panel.component';
import { MaterialModule} from './material/material.module';
import {BookingService} from './shared/booking.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleRecordComponent } from './single-record/single-record.component';



@NgModule({
  declarations: [
    AppComponent,
    BookPanelComponent,
    SingleRecordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule

  ],
  providers: [BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
