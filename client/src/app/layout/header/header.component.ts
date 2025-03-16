import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [DatePipe],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  constructor() {
  }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
    ngOnInit(): void {
        setInterval(() => {
          this.dateTime = new Date();
        }, 1000)
    }

}
