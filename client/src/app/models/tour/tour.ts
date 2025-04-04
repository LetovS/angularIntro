export interface ITour{
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img?: string;
  date?: Date;
  type?: 'single' | 'group' | 'all';
  locationId: string;
}

export class TourRequest implements ITour{
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img?: string;
  date?: Date;
  type?: 'single' | 'group' | 'all';
  locationId: string;
}
