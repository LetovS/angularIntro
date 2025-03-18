export interface ITour{
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: number;
  img?: string;
  date?: Date;
  type?: string;
}

export class TourRequest implements ITour{
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: number;
  img?: string;
  date?: Date;
  type?: string;
}
