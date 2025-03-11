import { Component } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [ButtonModule],
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private router: Router) {} // Внедрите Router

  goToMain() {
    this.router.navigate(['/']); // Используйте метод navigate для перенаправления
  }
}
