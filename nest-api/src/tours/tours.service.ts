import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { initData } from './mock';
import { Tour, TourDocument } from 'src/schemas/tour.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITour } from './model';

let toursStorage: ITour[] = initData();

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private toursRepository: Model<TourDocument>){
  }

  async getTours(): Promise<ITour[]> {
    const result = await this.toursRepository.find().lean().exec();
    return result.map(({ _id, __v, ...tour }) => ({
      id: _id.toString(),
      ...tour,
    }));
  }

  async getTour(tourId: string): Promise<ITour | null> {
    const dbTour = await this.toursRepository
      .findById(tourId)
      .lean()
      .exec();

      if (!dbTour) {
        return null;
      }

      const { _id, __v, ...tour } = dbTour;
      return {
        id: _id.toString(),
        ...tour,
      };
  }

  async getToursByLocationId(locationId: string): Promise<ITour[]> {
    const result = await this.toursRepository.find({locationId: locationId}).lean().exec();
    return result.map(({ _id, __v, ...tour }) => ({
      id: _id.toString(),
      ...tour,
    }));
  }

  async addTour(newTour: ITour): Promise<number | string> {
    const tourExists = await this.toursRepository.findOne({name: newTour.name}).exec();

    if (tourExists) {
      throw new ConflictException('That tour already exists');
    }

    const createdTour = new this.toursRepository(newTour);
    await createdTour.save();
    return createdTour.id;
  }

  async removeTour(removingTourid: string): Promise<true | string> {
    const tourExists = await this.toursRepository.findById(removingTourid).exec();

    if(tourExists){
      await tourExists.deleteOne();
      return true;
    }

    throw new NotFoundException(`Tour with id: ${removingTourid} not found`);
  }

  async initData(): Promise<void> {
    const items = await this.toursRepository.countDocuments().exec();
    if(items > 0 ) return;
    console.log('init');
    toursStorage = initData();
    const toursWithoutIdAndCleanPrice = toursStorage.map(({ id, ...rest }) => {                
      return {
        ...rest
      };
    });
    const result = await this.toursRepository.insertMany(toursWithoutIdAndCleanPrice);
    console.log(result);
  }
}