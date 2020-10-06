import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CalendarDataService } from "../../services/calendar-data.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public now = new Date();
  public year = this.now.getFullYear();
  public month = this.now.getMonth() + 1;
  public rows;
  public displayInfo = false;

  public infoForm: FormGroup = new FormGroup({
    displayMonth: new FormControl(),
    displayDay: new FormControl()
  });

  public displayDetails(m, d) {
    this.displayInfo = true;
    this.infoForm.setValue({ displayMonth: m, displayDay: d })
  }

  public columns = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];



  public monthToDisplay = this.monthNames[this.month - 1];


  constructor(private calendarService: CalendarDataService) { }

  public render() {
    this.monthToDisplay = this.monthNames[this.month - 1];
    this.rows = this.calendarService.createCalendar(this.calendarService.getDays(this.year, this.month), this.year, this.month);
  }

  public generatePrevMonth() {
    this.month--;
    if (this.month < 1) {
      this.year--;
      this.month = 12;
    }
    this.render();
  }

  public generateNextMonth() {
    this.month++;

    if (this.month > 12) {
      this.year++;
      this.month = 1
    }
    this.render();
  }


  ngOnInit(): void {
    this.rows = this.calendarService.createCalendar(this.calendarService.getDays(this.year, this.month), this.year, this.month);
  }

}