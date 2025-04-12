import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from 'src/schemas/country.schema';
import { initCountriesInDB } from './mock';
import { ICountry } from './model';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private countriesRepository: Model<CountryDocument>,
  ) {}

  /**
   * Получить список всех стран из базы данных.
   * @returns Массив стран (ICountry) или null, если данные не найдены.
   */
  async getCountries(): Promise<ICountry[] | null> {
    const res = await this.countriesRepository.find().lean().exec();
    return res;
  }

  /**
   * Инициализировать тестовые данные для стран, если данные ещё не существуют в базе данных.
   * @returns void. При успешном выполнении возвращает nothing.
   */
  async initData(): Promise<void | PromiseLike<void>> {
    const items = await this.countriesRepository.countDocuments().exec();
    if (items > 0) return;
    const countries = initCountriesInDB();
    await this.countriesRepository.insertMany(countries);
  }
}