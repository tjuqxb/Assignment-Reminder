import { Component, OnInit } from '@angular/core';
import {BookingService} from '../shared/booking.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.css']
})



export class SingleRecordComponent implements OnInit {

  public status = 'booking';
  public result;
  public zone;
  public form: FormGroup;
  public minDate: Date = new Date();
  public exist = true;
  public record: any;
  public geo: any;

  public timeList = ['0:00', '0:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
    '6:00', '6:30', '7:00', '7:30',
    '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00',
    '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];
  public hours = [];
  public mins = [];
  public advance = [];



  constructor(public service: BookingService) {
    this.form = new FormGroup({
      $key: new FormControl(null),
      course: new FormControl(''),
      title: new  FormControl('',[Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl(1, Validators.required),
      hours: new FormControl('', [Validators.required, this.hoursValidator]),
      mins: new FormControl('', [Validators.required, this.minsValidator]),
      advance: new FormControl('',[this.advanceValidator]),
      location: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.record = {};
    for (let i = 0; i < 24; i++) {
      this.hours.push(String(i));
    }
    for (let i = 0; i < 12; i++) {
      this.mins.push(String(i * 5));
    }
    for (let i = 0; i < 30; i++) {
      this.advance.push(String(i));
    }
  }

  deleteRecord():void {
    this.exist = false;
  }

  submitRecord(): any {
    if (this.form.valid) {
      let title = this.form.get('course').value + '_' + this.form.get('title').value;
      this.record.title = title;
      let start = [];
      let date = this.form.get('date').value;
      let advance = this.form.get('advance').value;
      //console.log(date);
      if (advance) {
        let d = parseInt(advance);
        // console.log(d);
        date = date.setDate(date.getDate() - d);
        date = new Date(date);
        this.record.title = this.record.title + "_" + d +"_days"+"_left";
        // console.log(date);
      }
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      start.push(year);
      start.push(month);
      start.push(day);
      // console.log(start);
      let time = this.form.get('time').value;
      let str = time.split(":");
      start.push(Number(str[0]));
      start.push(Number(str[1]));
      this.record.start = start;
      let duration = {hours: 0, minutes: 0};
      let hours = parseInt(this.form.get('hours').value);
      let mins = parseInt(this.form.get('mins').value);
      duration.hours = hours;
      duration.minutes = mins;
      this.record.duration = duration;
      // console.log(this.record);
      // console.log(this.form.get('location').value);
      if (this.form.get('location').value) {
        this.record.location = this.form.get('location').value;
      }

      // console.log(this.form.get('description').value);
      return this.record;
    }
  }

  hoursValidator(control: AbstractControl): any {
    let hours = control.value;
    if (hours === '') return null;
    let parsed = parseInt(hours, 10);
    let inValid: boolean = isNaN(parsed) || (parsed < 0 || parsed > 24);
    return inValid ? {invalidHours: {value: control.value}} : null;
  }

  minsValidator(control: AbstractControl): any {
    let mins = control.value;
    if (mins === '') return null;
    let parsed = parseInt(mins, 10);
    let inValid: boolean = isNaN(parsed) || (parsed < 0 || parsed > 59);
    return inValid ? {invalidMinutes: {value: control.value}} : null;
  }

  advanceValidator(control: AbstractControl): any {
    let days = control.value;
    if (days === '') return null;
    let parsed = parseInt(days, 10);
    let inValid: boolean = isNaN(parsed) || (parsed < 0 || parsed > 120);
    return inValid ? {invalidMinutes: {value: control.value}} : null;
  }
}
