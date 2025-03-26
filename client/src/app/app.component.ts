import {Component, NgModule} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ToastModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'intro';
}
