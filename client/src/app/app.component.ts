import {Component, inject, NgModule} from '@angular/core';
import {Router, RouterOutlet, ActivatedRoute} from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';
import {ButtonDirective} from "primeng/button";
import {TranslatePipe} from './pipies/translate.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ToastModule, ButtonDirective, TranslatePipe],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'intro';
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
}
