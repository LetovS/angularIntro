import {Component, NgModule, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
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
import {Subscription} from 'rxjs';

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
    ButtonDirective,
    TranslatePipe,
    ToursListActivitiesDirective
  ],
  standalone: true,
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit, OnDestroy {
  constructor(private toursService: ToursService,
              protected router: Router,
              private route: ActivatedRoute,
              private cartService: CartService,
              private notificationService: NotificationsService) {}

  tours: ITour [];
  toursStore: ITour [];
  tour: ITour | null = null;
  subscription: Subscription;
  ngOnInit(): void {
        this.toursService.getTours().subscribe(
        (data) => {
          this.tours = data;
          this.toursStore = [...data];
        },
        () => {

        });
       this.subscription = this.toursService.tourType$.subscribe((t) => {
        switch (t.code){
          case 'all':
            this.tours = [...this.toursStore]
            break;
          case 'single':
            this.tours = this.toursStore.filter((t) => t.type === 'single')
            break;
          case 'group':
            this.tours = this.toursStore.filter((t) => t.type === 'group')
            break;
        }
      })
      }

  ngOnDestroy(): void {
    this.tours = [];
    this.subscription.unsubscribe();
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
