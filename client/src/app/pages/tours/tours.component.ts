import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours/tours.service';
import {ITour} from '../../models/tour/tour';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    Button
  ],
  standalone: true,
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit, OnDestroy {
  constructor(private toursService: ToursService) {}

  tours: ITour [];
  ngOnInit(): void {
        this.toursService.getTours().subscribe(
        (data) => {
          this.tours = data;
        },
        () => {

        });
    }

  ngOnDestroy(): void {
    this.tours = [];
  }

}
