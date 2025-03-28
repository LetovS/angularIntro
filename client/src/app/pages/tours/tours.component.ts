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
    ButtonDirective
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
  labelDetail: string = $localize`:@@detail:Detail`;
  toolTipDetail: string = $localize`:@@showDetail:Show tour's detail`;
  labelBuy: string = $localize`:@@buy:Buy`;

  ngOnInit(): void {
        this.toursService.getTours().subscribe(
        (data) => {
          this.tours = data;
          this.toursStore = [...data];
        },
        () => {

        });
    }

  ngOnDestroy(): void {
    this.tours = [];
  }

  goToTour(item: ITour) {
    this.router.navigate([`tour`, item.id], {relativeTo: this.route});
  }
  selectedTour: ITour | null = null;
  isModalOpen: boolean = false;

  openDetail(tour: ITour){
    console.log(`Ищем тур по ${tour.id}`)
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
}
