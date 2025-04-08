import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours/tours.service';
import {ITour} from '../../models/tour/tour';
import {CardModule} from 'primeng/card';
import {Button, ButtonDirective} from 'primeng/button';
import {ModalComponent} from '../../common/modal/modal.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Tooltip} from 'primeng/tooltip';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {SearchTourPipe} from '../../pipies/searchPipe/search-tour.pipe';
import {FormsModule} from '@angular/forms';
import {CartService} from '../../services/cart/cart.service';
import {NotificationsService} from '../../services/notifications/notifications.service';
import {TranslatePipe} from '../../pipies/translate.pipe';
import {ToursListActivitiesDirective} from '../../shared/directives/tours-list-activities.directive';
import {Subject, takeUntil} from 'rxjs';
import {IDateFilter, ITourType} from '../../models/filters/filters';
import {isValid} from 'date-fns';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    Button,
    Tooltip,
    ModalComponent,
    CommonModule,
    InputGroup,
    InputGroupAddon,
    InputText,
    SearchTourPipe,
    FormsModule,
    TranslatePipe,
    ToursListActivitiesDirective
  ],
  standalone: true,
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit, OnDestroy {
  private currentDate: number | null = null;
  private currentTourType: ITourType | null = null;
  private destroy$ = new Subject<void>();
  currentLang: string;
  constructor(private toursService: ToursService,
              protected router: Router,
              private route: ActivatedRoute,
              private cartService: CartService,
              private notificationService: NotificationsService,
              private localizationService: LocalizationService) {}

  tours: ITour [];
  toursStore: ITour [];
  tour: ITour | null = null;

  ngOnInit(): void {
      this.toursService.getTours().subscribe(
      (data) => {
        this.tours = data;
        this.toursStore = [...data];
      },
      () => {

      });
    this.localizationService.currentLang$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLang = lang;
      });
   this.toursService.tourType$
     .pipe(takeUntil(this.destroy$))
     .subscribe((t) => {
     if (this.isIDateFilter(t)) {
       if (t.date && isValid(new Date(t.date))){
         this.currentDate = new Date(t.date).setHours(0, 0, 0, 0);
       }
       else{
         console.log('Фильтр по дате выкл')
         this.currentDate = null;
       }
     } else if (this.isITourType(t)) {
       this.currentTourType = t;
     }
     this.applyCombinedFilters();
    })
  }

  private applyCombinedFilters() {
    this.tours = [...this.toursStore];
    if (this.currentDate){
      console.log('Фильтрую по дате')
      this.tours = this.tours.filter((tour) => {
        return new Date(tour.date).setHours(0,0,0,0,) === this.currentDate;
      });
    }

    if (this.currentTourType){
      console.log('Фильтрую по типу', this.currentTourType.name)
      this.tours = this.tours.filter((tour) => {
        return this.currentTourType.code === 'all' || tour.type === this.currentTourType.code;
      });
    }
  }

  isITourType(obj: any): obj is ITourType {
    return obj && typeof obj === 'object' &&
      'name' in obj && 'code' in obj;
  }

  isIDateFilter(obj: any): obj is IDateFilter {
    return obj && typeof obj === 'object' &&
      'date' in obj;
  }
  ngOnDestroy(): void {
    this.tours = [];
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToTour(item: ITour) {
    this.router.navigate([`tour`, item.id], {relativeTo: this.route});
  }
  selectedTour: ITour | null = null;
  isModalOpen: boolean = false;

  openDetail(tour: ITour){
    this.toursService.getTour(tour.id).subscribe(
      (data) => {
        this.tour = data;
        this.openModal(this.tour);
      });
  }
  openModal(tour: ITour) {
    this.selectedTour = tour;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  buyTour(tour: ITour) {
    this.cartService.addOrder(tour);
    this.notificationService.showToastWithTemplate(tour)
    this.closeModal();
  }

  searchTour(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore, targetValue);
  }

  selectActive(index: number) {
    const item = this.tours.find((tour, i) => i === index);
    if (item){
      this.goToTour(this.tours[index]);
    }
  }
}
