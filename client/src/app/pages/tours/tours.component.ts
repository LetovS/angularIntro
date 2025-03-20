import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours/tours.service';
import {ITour} from '../../models/tour/tour';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {ModalComponent} from '../../common/modal/modal.component';
import {CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {relative} from '@angular/compiler-cli';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    Button,
    Tooltip,
    ModalComponent,
    CommonModule
  ],
  standalone: true,
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit, OnDestroy {
  constructor(private toursService: ToursService,
              private router: Router,
              private route: ActivatedRoute) {}

  tours: ITour [];
  tour: ITour | null = null;
  labelDetail: string = $localize`:@@detail:Detail`;
  toolTipDetail: string = $localize`:@@showDetail:Show tour's detail`;

  ngOnInit(): void {
        this.toursService.getTours().subscribe(
        (data) => {
          this.tours = data.map(tour => {
            return { ...tour, description: tour.description.substring(0,50) };
          });
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

  buyTour() {
    alert('Тур куплен!');
    this.closeModal();
  }
}
