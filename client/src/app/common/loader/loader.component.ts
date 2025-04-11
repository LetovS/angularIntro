import {AfterViewInit, Component, Input} from '@angular/core';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  imports: [
    ProgressSpinner
  ],
  templateUrl: './loader.component.html',
  standalone: true,
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() loaderStatus: boolean = false;
}
