import {Component, OnInit} from '@angular/core';
import {ISocial, socialLinks} from '../../models/menuItems/menuItems';
import {TranslatePipe} from '../../pipies/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe
  ],
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
