import {
  Component, computed,
  OnDestroy,
  OnInit
} from '@angular/core';
import {CartItemComponent} from './cart-item/cart-item.component';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {CartService} from '../../services/cart/cart.service';
import {NotificationsService} from '../../services/notifications/notifications.service';
import {IOrderOld, IOrderItem} from '../../models/cart/cart';
import {Subject, takeUntil} from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Button, ButtonDirective, ButtonLabel} from 'primeng/button';
import {InputNumber} from 'primeng/inputnumber';
import {InputMask} from 'primeng/inputmask';
import {Badge} from 'primeng/badge';
import {TableModule} from 'primeng/table';
import {cartHeaders, getHeaderTitle} from '../../models/menuItems/menuItems';
import {Checkbox, CheckboxChangeEvent} from 'primeng/checkbox';
import {OrdersService} from '../../services/orders.service';
import {IOrder} from '../../models/order';

export interface IReactiveFormItem {
  label: string,
  placeHolder: string,
  control: string,
  type: string,
  mask?:string
}

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartItemComponent,
    NgIf,
    NgForOf,
    InputText,
    ButtonLabel,
    ButtonDirective,
    InputNumber,
    Button,
    InputMask,
    Badge,
    TableModule,
    Checkbox,
    FormsModule
  ],
  templateUrl: './cart.component.html',
  standalone: true,
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;

  userFormFieldsArr: IReactiveFormItem[] = [
    { label: 'Имя', placeHolder: 'Введите имя', control: 'firstName', type: 'input' },
    { label: 'Фамилия', placeHolder: 'Введите фамилию', control: 'lastName', type: 'input' },
    { label: 'Номер карты', placeHolder: '0000 0000 0000 0000', control: 'cardNumber', type: 'mask', mask: '9999 9999 9999 9999' },
    { label: 'Дата рождения', placeHolder: '', control: 'birthDate', type: 'date' },
    { label: 'Возраст', placeHolder: '', control: 'age', type: 'number' },
    { label: 'Гражданство', placeHolder: 'Укажите ваше гражданство', control: 'citizenShip', type: 'input' },
    { label: 'Demo', placeHolder: 'Demo', control: 'demo', type: 'demo' }
  ];

  readonly cartHeaders = cartHeaders;
  cartItems: IOrderItem[] = [];
  selectedItems: IOrderItem[] = [];

  private destroy$ = new Subject<void>();
  private _cartCount = computed(() => this.cartService.cartItems$)

  constructor(private cartService: CartService,
              private notifyService: NotificationsService,
              private orderService: OrdersService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cardNumber: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        citizenShip: new FormControl(''),
      }
    )
    this.cartService.cartItems$.pipe(takeUntil(this.destroy$))
      .subscribe((date) => {
      this.cartItems = date;
    })
  }

  removeCartItem() {
    // Получаем массив имен (или уникальных идентификаторов) выбранных элементов
    const selectedNames = this.selectedItems.map(item => item.name);
    this.cartService.removeOrder(selectedNames);
    // Очищаем selectedItems после удаления
    this.selectedItems = [];
  }

  onSubmit(event: Event): void {
    event.stopPropagation();
    const selectedItems = this.selectedItems;
    const orderInfo = this.userForm.value;
    const orderDto: IOrder = {
      ...orderInfo,
      orderItems: selectedItems,
    }
    console.log('orderDto', orderDto)
    this.orderService.addOrders(orderDto);
    this.removeCartItem(); //TODO оформленные товары удаляем или минусуем по кол-ву
    console.log(selectedItems, orderInfo)
    this.showForms = false;
  }

  readonly getHeaderTitle = getHeaderTitle;

  isSelectedItem(event: CheckboxChangeEvent, cert: IOrderItem) {
    if (event.checked) {
      if (!this.selectedItems.some(item => item.name === cert.name)) {
        this.selectedItems.push(cert);
        console.log('Added:', cert.name, this.selectedItems);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(item => item.name !== cert.name);
      console.log('Removed:', cert.name, this.selectedItems);
    }
  }
  showForms: boolean = false;
  createOrder() {
    this.showForms = true;
  }

  cancelCreateOrder() {
    this.selectedItems = [];
    this.showForms = false;
    this.cartItems.forEach(item => {
      return item.isSelected = false;
    })
  }
}
