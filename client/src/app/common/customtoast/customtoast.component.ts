import { Component, TemplateRef, Input } from '@angular/core';

import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-custom-toast',
  template: `
    <ng-container *ngTemplateOutlet="template"></ng-container>
  `,
  imports: [
    NgTemplateOutlet
  ],
  standalone: true
})
export class CustomToastComponent {
  @Input() template!: TemplateRef<any>;
}
