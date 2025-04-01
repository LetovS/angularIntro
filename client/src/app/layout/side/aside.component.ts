import {Component, inject, OnInit} from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {Fieldset} from 'primeng/fieldset';
import {Select, SelectChangeEvent} from 'primeng/select';
import {ToursService} from '../../services/tours/tours.service';
import {getToursType, ITourType} from '../../models/filters/filters';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-aside',
  imports: [
    DropdownModule,
    FormsModule,
    Fieldset,
    Select,
    DatePickerModule
  ],
  standalone: true,
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
  tourService = inject(ToursService);

  selectedType: ITourType | undefined;
  toursType: ITourType [] = getToursType();
  selectedDate: Date | null = null;

  ngOnInit(): void {
    this.selectedType = this.toursType.find((t) => t.code === 'all');
  }

  changeTourType(event: SelectChangeEvent) {
    this.tourService.initChangeTourType(this.selectedType);
  }

  changeTourDate(event: SelectChangeEvent) {
    console.log(event.value);
  }
}
