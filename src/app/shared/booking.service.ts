import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators, ValidatorFn, AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public form: FormGroup;
  public minDate: Date = new Date();
  public maxDate = new Date();
  public timeList = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  constructor() {
    this.maxDate.setDate(new Date().getDate() + 14);
    this.form = new FormGroup({
      $key: new FormControl(null),
      hours: new FormControl('', [Validators.required, this.hoursValidator]),
      mins: new FormControl('', [Validators.required, this.minsValidator]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl(1, Validators.required),
    });
  }

  hoursValidator(control: AbstractControl): any {
      let hours = control.value;
      if (hours === '') return null;
      let parsed = parseInt(hours, 10);
      let inValid: boolean = isNaN(parsed) || (parsed < 0 || parsed > 6);
      return inValid ? {invalidHours: {value: control.value}} : null;
  }

  minsValidator(control: AbstractControl): any {
    let mins = control.value;
    if (mins === '') return null;
    let parsed = parseInt(mins, 10);
    let inValid: boolean = isNaN(parsed) || (parsed < 0 || parsed > 59);
    return inValid ? {invalidMinutes: {value: control.value}} : null;
  }



}
