import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, NgIf],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() content: any;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

  onOutsideClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.onClose();
    }
  }
}
