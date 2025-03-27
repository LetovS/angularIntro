import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { initData } from './mock';

let toursStorage: ITour[] = initData();

@Injectable()
export class ToursService {
  async getTours(): Promise<ITour[]> {
    console.log('recived all tours');
    await Promise.resolve();
    return toursStorage;
  }

  async getTour(tourId: string): Promise<ITour | null> {
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    const tour = toursStorage.find((t) => t.id === tourId) || null;
    return tour;
  }

  async getToursByLocationId(locationId: string): Promise<ITour[]> {
    await Promise.resolve();
    const result: ITour[] = toursStorage.filter(
      (t) => t.locationId === locationId,
    );
    console.log(`Found ${JSON.stringify(result)}`);
    return result;
  }

  async addTour(newTour: ITour): Promise<number | string> {
    console.log(`Search tour by name: ${newTour.name}`);
    await Promise.resolve();
    const exist = toursStorage.find((t) => t.name === newTour.name) || null;
    if (exist) {
      console.log('Alredy exists');
      throw new ConflictException('That tour already exists');
    }
    newTour.id = uuidv4();
    toursStorage.push(newTour);
    return newTour.id;
  }

  async removeTour(removingTourid: string): Promise<true | string> {
    console.log(`Search tour by id: ${removingTourid}`);
    await Promise.resolve();
    const indexToRemove = toursStorage.findIndex(
      (user) => user.id === removingTourid,
    );

    if (indexToRemove !== -1) {
      toursStorage.splice(indexToRemove, 1);
      console.log('Removed');
      return true;
    }
    console.log(`Tour with id: ${removingTourid} not found`);
    throw new NotFoundException(`Tour with id: ${removingTourid} not found`);
  }

  async initData(): Promise<void> {
    await Promise.resolve();
    if (toursStorage.length !== 0) {
      return;
    }

    toursStorage = initData();
  }
}

export class TourDto implements ITour {
  @ApiProperty({ description: 'id', example: 'null' })
  id: string;
  @ApiProperty({ description: 'Tour name', example: 'test' })
  name: string;
  @ApiProperty({ description: "Tour's description", example: 'test' })
  description: string;
  @ApiProperty({ description: "Tour's operator", example: 'test' })
  tourOperator: string;
  @ApiProperty({ description: "Tour's price", example: 1000 })
  price: string;
  @ApiProperty({ description: "Url's image", example: '' })
  img?: string;
  @ApiProperty({
    description: "Tour's date start",
    example: new Date(2025, 4, 25),
  })
  date?: Date;
  @ApiProperty({ description: "Tour's type", example: 'single' })
  type?: string;
  locationId?: string;
}

export interface ITour {
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img?: string;
  date?: Date;
  type?: string;
  locationId?: string;
}
