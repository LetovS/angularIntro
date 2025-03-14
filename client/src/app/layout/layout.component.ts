import { Component } from '@angular/core';
import {HeaderComponent} from './header/header/header.component';
import {FooterComponent} from './footer/footer/footer.component';
import {SideComponent} from './side/side/side.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, SideComponent],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
