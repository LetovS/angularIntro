import {Component, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours/tours.service';
import {ITour} from '../../models/tour/tour';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tours',
  imports: [
    DatePipe
  ],
  standalone: true,
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit{
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


}
