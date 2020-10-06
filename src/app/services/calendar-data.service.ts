import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {

  public now = new Date();
  public year = this.now.getFullYear();
  public month = this.now.getMonth() + 1;
  public getDays(y, m) {
    return new Date(y, m, 0).getDate();
  }
  public rows;

  createCalendar(totalDays, y, m) {
    let calendar = [];
    for (let i = 1; i <= totalDays; i++) {
      let dateArr = new Date(y, m - 1, i).toString().split(' ');
      let day = dateArr[0] === "Sun" ? ` ${[dateArr[0]]}:${+dateArr[2]}` : `${[dateArr[0]]}:${+dateArr[2]}`;
      calendar.push(day);
    }
    let strArray = calendar.join('|').split(' ');

    const monthData = strArray.map((elem) => {
      return elem.split('|').filter(v => v !== '').map(v => v.split(':'))
        .reduce((acc, arr) => {
          return { ...acc, [arr[0]]: arr[1] }
        }, {})

    })
    return monthData;
  }

  constructor() { }
}
