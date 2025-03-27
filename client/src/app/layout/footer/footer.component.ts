import {Component, OnInit} from '@angular/core';
import {ISocial, socialLinks} from '../../models/menuItems/menuItems';

@Component({
  selector: 'app-footer',
  imports: [],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  socials: ISocial [];

  ngOnInit(): void {
        this.socials = socialLinks();
    }

}
