import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ToursService} from '../../services/tours/tours.service';
import {ITour} from '../../models/tour/tour';
import {NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-tour-item',
  standalone: true,
  templateUrl: './tour-item.component.html',
  imports: [
    NgIf,
    Button,
    Card
  ],
  styleUrls: ['./tour-item.component.css']
})
export class TourItemComponent implements OnInit {
  tour: ITour | undefined;

  constructor(
    private route: ActivatedRoute,
    private toursService: ToursService
  ) {}

  ngOnInit(): void {
    console.log('Tour detail');

    const tourId = this.route.snapshot.paramMap.get('tourId');
    this.toursService.getTour(tourId).subscribe(
      (data) => {
        this.tour = data;
        console.log(data);
      }
    );
  }
}
