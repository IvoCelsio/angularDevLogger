import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    //  this.logs = [
    //    {
    //      text: 'Generated components',
    //      id: '1',
    //      date: new Date('12/06/2018 15:54:23')
    //    },
    //    {
    //      id: '2',
    //      text: 'Added Bootstrap',
    //      date: new Date('09/06/2018 12:37:03')
    //    },
    //    {
    //      id: '3',
    //      text: 'Added logs component',
    //      date: new Date('11/06/2018 09:40:23')
    //    }
    //  ]

    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(
      this.logs.sort((a, b) => {
        return (b.date = a.date);
      })
    );
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    // Update local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    // Delete from local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
