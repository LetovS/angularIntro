import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  NotFoundException,
  Query,
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
  @ApiOperation({
    summary: "Recived tour's list",
    operationId: 'getTours',
  })
  @ApiResponse({ status: 200, description: 'All tours' })
  async getTours(): Promise<TourDto[] | null> {
    return await this.toursService.getTours();
  }

  @Get('nearestTours')
  @ApiOperation({
    summary: 'Get tours nearest to a location',
    operationId: 'getToursByLocationId',
  })
  @ApiQuery({
    name: 'locationId',
    type: String,
    description: "ID of the location's tour",
  })
  @ApiResponse({ status: 200, description: 'Tours' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  async getToursByLocationId(
    @Query('locationId') locationId: string,
  ): Promise<ITour[]> {
    console.log(`Searching tours by ${locationId}`);
    return this.toursService.getToursByLocationId(locationId);
  }

  @Get('tour/:tourId')
  @ApiOperation({
    summary: 'Recived tour by Id',
    operationId: 'getTourById',
  })
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
    if (result) {
      return result;
    }
    throw new NotFoundException('Tour not found');
  }

  @Post('add-tour')
  @ApiOperation({
    summary: 'Add tour',
    operationId: 'addTour',
  })
  @ApiBody({ type: TourDto })
  @ApiResponse({ status: 201, description: 'seccusful' })
  @ApiResponse({ status: 409, description: 'That tour already exists' })
  async addTour(@Body() tour: ITour): Promise<number | string> {
    return this.toursService.addTour(tour);
  }

  @Post('init-test-data')
  @ApiOperation({
    summary: 'Init data for demo',
    operationId: 'initTestData',
  })
  @ApiResponse({ status: 200, description: 'seccusful' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  async initData(): Promise<void> {
    return this.toursService.initData();
  }

  @Delete('remove-tour/:tourId')
  @ApiOperation({
    summary: 'Remove tour',
    operationId: 'removeTourById',
  })
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
