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
  constructor(
    @InjectModel(Tour.name) private toursRepository: Model<TourDocument>,
  ) {}

  /**
   * Получить все туры из базы данных.
   * @returns Список туров
   */
  async getTours(): Promise<ITour[]> {
    const result = await this.toursRepository.find().lean().exec();
    return result.map(({ _id, __v, ...tour }) => ({
      id: _id.toString(),
      ...tour,
    }));
  }

  /**
   * Получить тур по ID.
   * @param tourId Идентификатор тура
   * @returns Тур или null, если не найден
   */
  async getTour(tourId: string): Promise<ITour | null> {
    const dbTour = await this.toursRepository.findById(tourId).lean().exec();

    if (!dbTour) {
      return null;
    }

    const { _id, __v, ...tour } = dbTour;
    return {
      id: _id.toString(),
      ...tour,
    };
  }

  /**
   * Получить туры, связанные с конкретным местоположением.
   * @param locationId Идентификатор местоположения
   * @returns Список туров, связанных с местоположением
   */
  async getToursByLocationId(locationId: string): Promise<ITour[]> {
    const result = await this.toursRepository
      .find({ locationId: locationId })
      .lean()
      .exec();
    return result.map(({ _id, __v, ...tour }) => ({
      id: _id.toString(),
      ...tour,
    }));
  }

  /**
   * Добавить новый тур в базу данных.
   * @param newTour Данные нового тура
   * @returns ID нового тура
   * @throws ConflictException Если тур с таким названием уже существует
   */
  async addTour(newTour: ITour): Promise<number | string> {
    const tourExists = await this.toursRepository
      .findOne({ name: newTour.name })
      .exec();

    if (tourExists) {
      throw new ConflictException('That tour already exists');
    }

    const createdTour = new this.toursRepository(newTour);
    await createdTour.save();
    return createdTour.id;
  }

  /**
   * Удалить тур по ID.
   * @param removingTourid Идентификатор тура для удаления
   * @returns true, если тур удален успешно
   * @throws NotFoundException Если тур не найден
   */
  async removeTour(removingTourid: string): Promise<true | string> {
    const tourExists = await this.toursRepository
      .findById(removingTourid)
      .exec();

    if (tourExists) {
      await tourExists.deleteOne();
      return true;
    }

    throw new NotFoundException(`Tour with id: ${removingTourid} not found`);
  }

  /**
   * Инициализация данных в базе, если они еще не были добавлены.
   * @returns void
   */
  async initData(): Promise<void> {
    const items = await this.toursRepository.countDocuments().exec();
    if (items > 0) return;
    console.log('init');
    toursStorage = initData();
    const toursWithoutIdAndCleanPrice = toursStorage.map(({ id, ...rest }) => {
      return {
        ...rest,
      };
    });
    const result = await this.toursRepository.insertMany(
      toursWithoutIdAndCleanPrice,
    );
    console.log(result);
  }
}

export { ITour };
