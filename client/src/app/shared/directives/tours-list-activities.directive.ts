  import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, Renderer2,
  SimpleChanges
} from '@angular/core';

  @Directive({
    standalone: true,
    selector: '[appToursListActivities]',
    host:{
      '(document:keyup)': 'initKeyUp($event)',
      '(click)': 'onMouseClick($event)',
    },
  })
  export class ToursListActivitiesDirective implements OnInit,
    OnChanges,
    AfterViewInit,
    AfterViewChecked {

    @Input() selector: string;
    @Input() initFirst: boolean = false;
    @Input() updateView: boolean = false;
    @Output() renderComplete = new EventEmitter();
    @Output() onEnter = new EventEmitter();
    @Output() onLeave = new EventEmitter();
    private index: number = 0;
    private isLoaded: boolean = false;
    private mouseMoveListeners: Function[] = [];

    private items: HTMLElement[] = [];
    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngAfterViewChecked(): void {
          const isItemsLoaded = this.el.nativeElement.querySelectorAll(this.selector);
          if(this.initFirst && isItemsLoaded?.length && !this.isLoaded) {
            this.isLoaded = true;
            this.changeIndex(0);
            this.setupMouseMoveHandlers();
          }
      }

    private setupMouseMoveHandlers() {
      // Очищаем предыдущие обработчики
      this.mouseMoveListeners.forEach(listener => listener());
      this.mouseMoveListeners = [];

      // Получаем текущие элементы
      this.items = [...this.el.nativeElement.querySelectorAll(this.selector)];

      // Добавляем обработчики mouseover для каждого элемента
      this.items.forEach((item, index) => {
        const listener = this.renderer.listen(item, 'mouseover', (event) => {
          this.onMouseOver(event, index);
        });
        this.mouseMoveListeners.push(listener);
      });
    }
    private onMouseOver(event: MouseEvent, index: number) {
      event.preventDefault();
      this.changeActiveIndex(index);
    }

    private changeActiveIndex(newIndex: number) {
      if (newIndex < 0 || newIndex >= this.items.length) return;

      // Удаляем активный класс у всех элементов
      this.items.forEach(item => item.classList.remove('active'));

      // Устанавливаем новый активный индекс
      this.index = newIndex;

      // Добавляем активный класс новому элементу
      this.items[this.index].classList.add('active');

      // Прокручиваем к активному элементу
      this.items[this.index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }

    ngAfterViewInit(): void {

      }

    ngOnChanges(changes: SimpleChanges): void {
      }

    ngOnInit(): void {
      }

    get activeIndex(){
      return this.index;
    }

    private changeIndex(shift: -1 | 0 | 1) {
      const items = [...this.el.nativeElement.querySelectorAll(this.selector)];

      if(!items.length){
        return;
      }

      const index = items.findIndex((e:Element) => e.classList.contains('active'))

      this.index = index === -1 ? 0 : index
      items[this.index].classList.remove('active');

      this.index += shift;


      if(this.index < 0){
        this.index = items.length - 1;
      }
      if(this.index > items.length - 1){
        this.index = 0;
      }

      items[this.index].classList.toggle('active');

      (items[this.index] as HTMLDivElement).scrollIntoView({
        behavior: 'smooth', block: 'end', inline: 'nearest'
      });
    }

    initKeyUp(event: KeyboardEvent) {
      event.preventDefault();
      if(event.key === 'ArrowRight'){
        this.changeIndex(1);
      } else if (event.key === 'ArrowLeft'){
        this.changeIndex(-1);
      } else if (event.key === 'Enter'){
        this.openTourDetail();
      }
    }

    private openTourDetail() {
      const items = [...this.el.nativeElement.querySelectorAll(this.selector)];
      const index = items.findIndex((e:Element) => e.classList.contains('active'))
      this.onEnter.emit(index);
    }

    onMouseClick(event: MouseEvent) {
      event.preventDefault();
      if (event.button !== 0) return;
      this.openTourDetail();
    }
  }
