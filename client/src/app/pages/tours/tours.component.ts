import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours/tours.service';
import {ITour} from '../../models/tour/tour';
import {CardModule} from 'primeng/card';
import {Button} from 'primeng/button';
import {ActivatedRoute, Router} from '@angular/router';
import {relative} from '@angular/compiler-cli';

@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    Button
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
  getTourDetail(tour: ITour): void{
    console.log(tour.id)


  }

  goToTour(item: ITour) {
    this.router.navigate([`tour`, item.id], {relativeTo: this.route});
  }
}
