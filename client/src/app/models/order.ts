import {IOrderItem} from './cart/cart';

export interface IOrder {
  id: string,
  age : number,
  birthDate: Date,
  cardNumber: string,
  citizenShip: string,
  firstName: string,
  lastName: string,
  orderItems: IOrderItem[]
}
