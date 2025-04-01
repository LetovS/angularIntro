import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Directive({
  standalone: true,
  selector: '[appBackspace]',
  host:{
    '(document:keydown)': 'handleBackspace($event)',
  }
})
export class BackspaceDirective implements OnInit, OnDestroy {
  @Input() redirectRoute: string | string[];
  constructor(private router: Router) { }

  ngOnInit(): void {

    }

  handleBackspace(event: KeyboardEvent) {
    // Проверяем, что нажат Backspace и фокус не в поле ввода
    if (event.key === 'Backspace' && !this.isInputElement(event.target)) {
      event.preventDefault();
      event.stopPropagation();

      if (this.redirectRoute) {
        this.router.navigate(Array.isArray(this.redirectRoute)
          ? this.redirectRoute
          : [this.redirectRoute]);
      }
    }
  }

  private isInputElement(target: EventTarget | null): boolean {
    if (!target) return false;
    const tagName = (target as HTMLElement).tagName.toLowerCase();
    return tagName === 'input' || tagName === 'textarea' ||
      (target as HTMLElement).isContentEditable;
  }

  ngOnDestroy() {
    // Очистка при необходимости
  }
}
