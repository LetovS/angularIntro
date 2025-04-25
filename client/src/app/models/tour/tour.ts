export interface ITour{
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: number;
  img?: string;
  date?: Date;
  type?: 'single' | 'group' | 'all';
  locationId: string;
  country?: string;
  code?: string;
  isCart?: boolean;
}

export class TourRequest implements ITour{
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: number;
  img?: string;
  date?: Date;
  type?: 'single' | 'group' | 'all';
  locationId: string;
  country?: string;
  code?: string;
}

export interface ILocation{
  lat: number;
  lng: number;
}
