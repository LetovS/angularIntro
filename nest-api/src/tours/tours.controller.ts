import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ToursService } from './tours.service';
import { ITour, CreateTourRequest } from './model';
import { JwtAuthGuard } from 'src/infrastructure/auth/auth-guards/jwt-auth.guard';

@ApiTags('Tours')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tours')
@UseGuards(JwtAuthGuard)
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

   /**
   * Получить список всех туров.
   * @returns Массив туров.
   */
  @Get()
  @ApiOperation({ summary: "Recived tour's list" })
  @ApiResponse({ status: 200, description: 'All tours' })
  async getTours(): Promise<CreateTourRequest[] | null> {
    return await this.toursService.getTours();
  }

  /**
   * Получить туры, ближайшие к указанному местоположению.
   * @param locationId Идентификатор местоположения.
   * @returns Массив туров, ближайших к местоположению.
   */
  @Get('nearby')
  @ApiOperation({ summary: 'Get tours nearest to a location' })
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

  /**
   * Получить тур по ID.
   * @param tourId Идентификатор тура.
   * @returns Тур с указанным ID.
   * @throws NotFoundException Если тур не найден.
   */
  @Get(':tourId')
  @ApiOperation({ summary: 'Recived tour by Id' })
  @ApiParam({
    name: 'tourId',
    type: String,
    description: 'ID of the tour to remove',
  })
  @ApiResponse({ status: 200, description: 'Tour' })
  @ApiResponse({ status: 404, description: 'Tour not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  async getTourById(@Param('tourId') tourId: string): Promise<CreateTourRequest | null> {
    const result = await this.toursService.getTour(tourId);
    if (result) {
      return result;
    }
    throw new NotFoundException('Tour not found');
  }

  /**
   * Добавить новый тур.
   * @param tour Данные для добавления нового тура.
   * @returns ID нового тура или сообщение об ошибке.
   */
  @Post()
  @ApiOperation({ summary: 'Add tour' })
  @ApiBody({ type: CreateTourRequest })
  @ApiResponse({ status: 201, description: 'seccusful' })
  @ApiResponse({ status: 409, description: 'That tour already exists' })
  async addTour(@Body() tour: ITour): Promise<number | string> {
    return this.toursService.addTour(tour);
  }

  /**
   * Инициализация тестовых данных для демонстрации.
   * @returns Успешное выполнение операции.
   */
  @Post('test-data/initialize')
  @ApiOperation({ summary: 'Init data for demo' })
  @ApiResponse({ status: 200, description: 'seccusful' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  async initData(): Promise<void> {
    return this.toursService.initData();
  }

  /**
   * Удалить тур по ID.
   * @param tourId Идентификатор тура для удаления.
   * @returns Сообщение о успешном удалении или ошибке.
   */
  @Delete(':tourId')
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
