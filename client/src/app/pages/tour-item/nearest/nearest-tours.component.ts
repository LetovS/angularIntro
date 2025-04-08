import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  model,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ITour} from '../../../models/tour/tour';
import {ToursService} from '../../../services/tours/tours.service';
import {Button, ButtonModule} from 'primeng/button';
import {Card} from 'primeng/card';
import {SearchTourPipe} from '../../../pipies/searchPipe/search-tour.pipe';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {GalleriaModule} from 'primeng/galleria';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '../../../pipies/translate.pipe';
import {InputGroup, InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddon, InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'app-nearest',
  imports: [
    Button,
    PrimeTemplate,
    GalleriaModule,
    NgOptimizedImage,
    TranslatePipe,
    InputGroup,
    InputGroupAddon,
    InputText,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './nearest-tours.component.html',
  standalone: true,
  styleUrl: './nearest-tours.component.scss'
})
export class NearestToursComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input({required: true}) tour: ITour | null = null;
  @Output() selectedTourChangedId = new EventEmitter<ITour>();
  @ViewChild('searchInput') searchInput: ElementRef;

  renderTours = model<ITour []>([]);
  nearToursStore = model<ITour[]>([]);
  subscription: Subscription;
  constructor(private toursService: ToursService) {
  }

  ngAfterViewInit(): void {
    this.subscription = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
      .subscribe((ev) => {
        const inputTargetValue = (ev.target as HTMLInputElement).value;
        if (inputTargetValue === '') {
          this.renderTours.set(this.nearToursStore());
        } else{
          const newTours = this.toursService.searchTours(this.nearToursStore(), inputTargetValue);
          this.renderTours.set(newTours);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tour = changes['tour']?.currentValue;
    if (tour?.locationId) {
      this.toursService.getToursByLocationId(this.tour.locationId)
        .subscribe((data: ITour []) => {
          this.nearToursStore.set(data.filter((t: ITour) => t.id !== tour.id));
          this.renderTours.set(this.nearToursStore());
        })
    }
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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

  tourChanged(index: number) {
    const tour = this.nearToursStore()[index];
    this.selectedTourChangedId.emit(tour);
  }
}

