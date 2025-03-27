import {Component, EventEmitter, Input, model, OnChanges, OnInit, Output, signal, SimpleChanges} from '@angular/core';
import {ITour} from '../../../models/tour/tour';
import {ToursService} from '../../../services/tours/tours.service';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {SearchTourPipe} from '../../../pipies/searchPipe/search-tour.pipe';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {GalleriaModule} from 'primeng/galleria';

@Component({
  selector: 'app-nearest',
  imports: [
    Button,
    Card,
    SearchTourPipe,
    Carousel,
    PrimeTemplate,
    GalleriaModule
  ],
  templateUrl: './nearest-tours.component.html',
  standalone: true,
  styleUrl: './nearest-tours.component.scss'
})
export class NearestToursComponent implements OnInit, OnChanges {
  constructor(private toursService: ToursService) {
  }
  nearestTours = signal<ITour[]>([]);
  ngOnChanges(changes: SimpleChanges): void {
    const tour = changes['tour']?.currentValue;
    if (tour?.locationId) {
      this.toursService.getToursByLocationId(this.tour.locationId)
        .subscribe((data: ITour []) => {
          this.nearestTours.set(data.filter((t: ITour) => t.id !== tour.id));
        })
    }
  }
  ngOnInit(): void {

  }

  @Input({required: true}) tour: ITour | null = null;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  @Output() selectedTourChangedId = new EventEmitter<ITour>();

  tourChanged(index: number) {
    const tour = this.nearestTours()[index];
    this.selectedTourChangedId.emit(tour);
  }
}

