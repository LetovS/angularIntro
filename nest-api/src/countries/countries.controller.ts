import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService, ICountry } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('countries')
  @ApiOperation({ summary: "Recived countries's list" })
  @ApiResponse({ status: 200, description: 'All tours' })
  async getCountries(): Promise<ICountry[] | null> {
    return await this.countriesService.getCountries();
  }

  @Post('init-test-data')
  @ApiOperation({ summary: 'Init data for demo' })
  @ApiResponse({ status: 200, description: 'seccusful' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  async initData(): Promise<void> {
    return this.countriesService.initData();
  }
}
