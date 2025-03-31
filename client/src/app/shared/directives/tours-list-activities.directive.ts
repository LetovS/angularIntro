import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appToursListActivities]',
  host:{
    '(document:keyup)': 'initKeyUp($event)',
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

  constructor(private el: ElementRef) {
  }

  ngAfterViewChecked(): void {
        const isItemsLoaded = this.el.nativeElement.querySelectorAll(this.selector);
        //console.log('***');
        if(this.initFirst && isItemsLoaded?.length && !this.isLoaded) {
          console.log('set')
          this.isLoaded = true;
          this.changeIndex(0);
        }
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
      console.log(this.index);
      this.index = items.length - 1;
      console.log(this.index);
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
      const items = [...this.el.nativeElement.querySelectorAll(this.selector)];
      const index = items.findIndex((e:Element) => e.classList.contains('active'))
      this.onEnter.emit(index);
    }
  }
}
