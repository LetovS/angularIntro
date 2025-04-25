export interface IOrderOld {
  items: IOrderItem[];
  status: boolean;
  total: number;
  date: Date;
  customerName: string;
  id: string
}

export interface IOrderItem{
  id?: string;
  name: string;
  quantity: number;
  price: number;
  isSelected?: boolean;
}
