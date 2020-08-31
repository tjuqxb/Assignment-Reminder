import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookPanelComponent } from './book-panel/book-panel.component';
import { MaterialModule} from './material/material.module';
import {BookingService} from './shared/booking.service';



@NgModule({
  declarations: [
    AppComponent,
    BookPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
