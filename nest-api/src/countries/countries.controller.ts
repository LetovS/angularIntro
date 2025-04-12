import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { ICountry } from './model';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  /**
   * Получить список всех стран
   * @returns Массив стран (ICountry) или null, если данные не найдены
   */
  @Get()
  @ApiOperation({ summary: "Recived countries's list" })
  @ApiResponse({ status: 200, description: 'All tours' })
  async getCountries(): Promise<ICountry[] | null> {
    return await this.countriesService.getCountries();
  }

  /**
   * Инициализировать тестовые данные для стран (используется для демонстрационных целей)
   * @returns void, но может выбросить ошибку, если что-то пошло не так
   */
  @Post('test-data/initialize')
  @ApiOperation({ summary: 'Init data for demo' })
  @ApiResponse({ status: 200, description: 'seccusful' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  async initData(): Promise<void> {
    return this.countriesService.initData();
  }
}
