import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ToursService} from '../../services/tours/tours.service';
import {ITour} from '../../models/tour/tour';
import {Location, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {NearestToursComponent} from './nearest/nearest-tours.component';

@Component({
  selector: 'app-tour-item',
  standalone: true,
  templateUrl: './tour-item.component.html',
  imports: [
    Card,
    RouterLink,
    Button,
    NgIf,
    NearestToursComponent
  ],
  styleUrls: ['./tour-item.component.css']
})
export class TourItemComponent implements OnInit {
  tour: ITour | null = null;

  constructor(
    private route: ActivatedRoute,
    private toursService: ToursService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const tourId = this.route.snapshot.paramMap.get('tourId');
    this.toursService.getTour(tourId).subscribe(
      (data) => {
        this.tour = data;
      }
    );
  }

  changeCurrentTour(tour: ITour) {
    this.tour = tour;
    this.location.replaceState('tours/tour/' + tour.id);
  }
}
