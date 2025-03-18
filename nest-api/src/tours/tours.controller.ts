import { Controller, Post, Body, Get, Query, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import {ToursService, TourDto, ITour} from './tours.service'

@ApiTags('tours')
@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Get('tours')
    @ApiOperation({summary: 'Recived tour\'s list'})
    @ApiResponse({status: 200, description: 'All tours'})
    async getTours(): Promise<TourDto [] | null>{
        return await this.toursService.getTours();
    }

    @Post('add-tour')
    @ApiOperation({summary: 'Add tour'})
    @ApiBody({ type: TourDto })
    @ApiResponse({status: 201, description: 'seccusful'})
    @ApiResponse({status: 409, description: 'That tour already exists'})
    async addTour(@Body()tour: ITour): Promise<number | string>{
        return this.toursService.addTour(tour);
    }

    @Delete('remove-tour/:tourId')
    @ApiOperation({summary: 'Remove tour'})
    @ApiParam({ name: 'tourId', type: String, description: 'ID of the tour to remove' })
    @ApiResponse({status: 201, description: 'seccusful'})
    @ApiResponse({status: 404, description: 'Not found'})
    async removeTour(@Param('tourId') tourId: string): Promise<true | string>{
        console.log(tourId);
        return this.toursService.removeTour(tourId);
    }
}   
