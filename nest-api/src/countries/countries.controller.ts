import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
    
    constructor(private readonly countriesService: CountriesService){}

    @Post('init-test-data')
    @ApiOperation({ summary: 'Init data for demo' })
    @ApiResponse({ status: 200, description: 'seccusful' })
    @ApiResponse({ status: 500, description: 'Something went wrong' })
    async initData(): Promise<void> {
        return this.countriesService.initData();
    }
}
