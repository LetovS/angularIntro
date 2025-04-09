import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {BackspaceDirective} from '../../../shared/directives/backspace.directive';

@Component({
  selector: 'app-tours-editor',
  imports: [
    Button,
    RouterLink,
    BackspaceDirective
  ],
  templateUrl: './tours-editor.component.html',
  standalone: true,
  styleUrl: './tours-editor.component.scss'
})
export class ToursEditorComponent {

}
