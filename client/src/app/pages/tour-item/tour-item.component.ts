import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
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
    Card,
    RouterLink,
    Button,
    NgIf
  ],
  styleUrls: ['./tour-item.component.css']
})
export class TourItemComponent implements OnInit {
  tour: ITour | null = null;

  constructor(
    private route: ActivatedRoute,
    private toursService: ToursService
  ) {}

  ngOnInit(): void {

    const tourId = this.route.snapshot.paramMap.get('tourId');
    this.toursService.getTour(tourId).subscribe(
      (data) => {
        this.tour = data;
      }
    );
  }
}
