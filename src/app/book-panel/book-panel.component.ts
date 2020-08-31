import { Component, OnInit } from '@angular/core';
import {BookingService} from '../shared/booking.service';

@Component({
  selector: 'app-book-panel',
  templateUrl: './book-panel.component.html',
  styleUrls: ['./book-panel.component.css']
})



export class BookPanelComponent implements OnInit {

  public status = 'booking';
  public result;

  constructor(public service: BookingService) {

  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    if (this.service.form.valid) {
      let hours = parseInt(this.service.form.get('hours').value);
      let mins = parseInt(this.service.form.get('mins').value);
      let date = this.service.form.get('date').value;
      let day = date.getDay();
      if (day === 0 || day === 6) {
        this.result = Math.round((hours + mins / 60) * 150);
      } else {
        this.result = Math.round((hours + mins / 60) * 100);
      }
    }
    this.status = 'result';
  }
}
