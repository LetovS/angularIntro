import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AsideComponent} from './side/aside.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AsideComponent],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
