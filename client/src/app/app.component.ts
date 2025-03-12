import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'intro';
}
