import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from 'src/schemas/country.schema';
import { initCountriesInDB } from './mock';

@Injectable()
export class CountriesService {
    async getCountries(): Promise<ICountry[] | null> {
        return await this.countriesRepository.find().lean().exec();        
    }
    
    constructor(@InjectModel(Country.name) private countriesRepository: Model<CountryDocument>){
      }
    
    async initData(): Promise<void | PromiseLike<void>> {
        console.log('Starting...');
        const items = await this.countriesRepository.countDocuments().exec();
        console.log('Getten...', items);
        if(items > 0 ) return;
        console.log('init');
        const countries = initCountriesInDB();
        const result = await this.countriesRepository.insertMany(countries);
    }

}


export interface ICountry{
    id?: string,
    flag_url: string,
    iso_code2: string,
    iso_code3: string,
    name_ru: string
}