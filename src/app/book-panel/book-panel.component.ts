import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BookingService} from '../shared/booking.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTime} from 'luxon';
import {SingleRecordComponent} from '../single-record/single-record.component';
import * as ics from 'ics';


@Component({
  selector: 'app-book-panel',
  templateUrl: './book-panel.component.html',
  styleUrls: ['./book-panel.component.css']
})



export class BookPanelComponent implements OnInit, AfterViewInit {
  @ViewChildren(SingleRecordComponent)
  private records: QueryList<SingleRecordComponent>;

  public status = 'booking';
  public result;
  public zone;
  public form: FormGroup;
  public listAdd = [];
  public recordData = [];
  public geo = {lon: 0, lat: 0};
  public set = false;


  constructor(public service: BookingService) {
    this.form = new FormGroup({
      email: new FormControl('',[Validators.email])
    });
  }

  ngOnInit(): void {
    this.zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      that.geo.lon = position.coords.longitude;
      that.geo.lat = position.coords.latitude;
      that.set = true;
    });

  }

  ngAfterViewInit(): void {
    this.records.forEach((ele) => {
      //console.log(ele.form);
    } )
  }

  addOne(): void {
    this.listAdd.push(1);
  }

  handleSubmit($event): void {
    this.recordData = [];
    this.records.forEach(ele => {
      //console.log(ele.exist);
      if(ele.exist) {
        let singleData = ele.submitRecord();
        if (singleData) {
          if (this.set) {
            singleData.geo = this.geo;
          }
          this.recordData.push(singleData);
        }
      }
    });

    const { error, value } = ics.createEvents(this.recordData
     );
    if (error) {
      //console.log(error);
      return;
    }
    //console.log(typeof value);
    //console.log(value);
    this.loadFile(new Date().toUTCString() + '.ics', value);
  }


  loadFile(fileName, content){
    var aLink = document.createElement('a');
    var blob = new Blob([content], {
      type: 'text/plain'
    });
    var evt = new Event('click');
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
    URL.revokeObjectURL(aLink.href);
  }
}
