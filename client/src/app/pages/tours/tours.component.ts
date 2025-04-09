import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours/tours.service';
import {ILocation, ITour} from '../../models/tour/tour';
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
import {Dialog} from 'primeng/dialog';
import {MapComponent} from '../../common/map/map.component';
import {ICoords, IWeatherViewModel} from '../../models/models';

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
    ToursListActivitiesDirective,
    NgOptimizedImage,
    Dialog,
    MapComponent
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
  location: ICoords;
  showModal: boolean = false;
  weather: IWeatherViewModel;
  getCountryDetail(ev: Event, code: string): void {
    ev.stopPropagation();
    this.toursService.getLocationById(code).subscribe((data) => {
      if(Array.isArray(data)){
        const countryInfo = data[0];
        console.log('countryInfo ',countryInfo);
        this.location = {lat: countryInfo.latlng[0], lng: countryInfo.latlng[1]};
        console.log('location ',this.location);
        this.showModal = true;
      }
    })
  }

  showMap(ev: MouseEvent, id: string) {
    ev.stopPropagation();
    this.toursService.getCountryData(id).subscribe((data) => {
      console.log('///received data ',data);
      console.log('countryInfo', data.coords);

      this.location = {lat: data.coords.cords.lat, lng: data.coords.cords.lng};
      console.log('location ',this.location);
      this.weather = data.weather;
      this.showModal = true;
    });
  }

  removeTour(tourId: string) {
    console.log('///remove tour', tourId);
    this.toursService.removeTourById(tourId).subscribe((data) => {
      if (data){
        this.notificationService
          .initToast('success', 'Тур успешно удалён', 'Удаление', 2000);
        this.toursService.getTours().subscribe(
          (updatedTours) => {
            this.tours = updatedTours;
            this.toursStore = [...updatedTours];
            this.applyCombinedFilters(); // Если нужно применить фильтры к обновленному списку
          },
          (error) => {
            console.error('Ошибка при обновлении списка туров:', error);
          });
      } else{
        this.notificationService
          .initToast('error', 'При удалении тура возникли проблемы', 'Удаление', 2000);
      }
    })
  }

  getWeatherIcon(): { icon: string; text: string } {
    if (this.weather.rain === 0 && this.weather.snowFall === 0) {
      return { icon: 'fa-sun', text: 'Ясно' };
    } else {
      return { icon: 'fa-cloud', text: 'Осадки' };
    }
  }
}
