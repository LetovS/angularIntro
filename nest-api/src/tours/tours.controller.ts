import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ToursService, TourDto, ITour } from './tours.service';

@ApiTags('tours')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get('tours')
  @ApiOperation({ summary: "Recived tour's list" })
  @ApiResponse({ status: 200, description: 'All tours' })
  async getTours(): Promise<TourDto[] | null> {
    return await this.toursService.getTours();
  }

  @Get('tour/:tourId')
  @ApiOperation({ summary: "Recived tour by Id" })
  @ApiParam({
    name: 'tourId',
    type: String,
    description: 'ID of the tour to remove',
  })
  @ApiResponse({ status: 200, description: 'Tour' })
  @ApiResponse({ status: 404, description: 'Tour not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  
  async getTourById(@Param('tourId') tourId: string): Promise<TourDto | null> {
    const result = await this.toursService.getTour(tourId);
    if(result){
      return result;
    }
    throw new NotFoundException('Tour not found');
  }

  @Post('add-tour')
  @ApiOperation({ summary: 'Add tour' })
  @ApiBody({ type: TourDto })
  @ApiResponse({ status: 201, description: 'seccusful' })
  @ApiResponse({ status: 409, description: 'That tour already exists' })
  async addTour(@Body() tour: ITour): Promise<number | string> {
    return this.toursService.addTour(tour);
  }

  @Post('init-test-data')
  @ApiOperation({ summary: 'Init data for demo' })
  @ApiResponse({ status: 200, description: 'seccusful' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  async initData(): Promise<void> {
    return this.toursService.initData();
  }

  @Delete('remove-tour/:tourId')
  @ApiOperation({ summary: 'Remove tour' })
  @ApiParam({
    name: 'tourId',
    type: String,
    description: 'ID of the tour to remove',
  })
  @ApiResponse({ status: 200, description: 'seccusful' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async removeTour(@Param('tourId') tourId: string): Promise<true | string> {
    console.log(tourId);
    return this.toursService.removeTour(tourId);
  }
}
