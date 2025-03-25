import {Component, Input, model, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ITour} from '../../../models/tour/tour';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-setting-item',
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './setting-item.component.html',
  standalone: true,
  styleUrl: './setting-item.component.scss'
})
export class SettingItemComponent implements OnInit, OnChanges {
  settings = model<{ name:string }[]>([]);
  ngOnChanges(changes: SimpleChanges): void {
      throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }
  @Input({required: true}) settingItems: { name:string }[] | null = null;
}
