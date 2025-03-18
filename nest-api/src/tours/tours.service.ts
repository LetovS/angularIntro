import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

const toursStorage: ITour [] = [];

@Injectable()
export class ToursService {

    async getTours(): Promise<ITour []>{
        console.log('recived all tours')
        await Promise.resolve();
        return toursStorage;
    }

    async addTour(newTour: ITour): Promise<number | string>{
        console.log(`Search tour by name: ${newTour.name}`)
        const exist = toursStorage.find(t => t.name === newTour.name) || null;
        if(exist){
            console.log('Alredy exists');
            throw new ConflictException('That tour already exists');
        }
        newTour.id = uuidv4();
        toursStorage.push(newTour);
        return newTour.id;
    }

    async removeTour(removingTourid: string): Promise<true | string>{
        console.log(`Search tour by id: ${removingTourid}`)
        const indexToRemove = toursStorage.findIndex(user => user.id === removingTourid);

        if (indexToRemove !== -1) {
            toursStorage.splice(indexToRemove, 1);
            console.log('Removed')
            return true;
        }
        console.log(`Tour with id: ${removingTourid} not found`);
        throw new NotFoundException(`Tour with id: ${removingTourid} not found`);
    }

}


export class TourDto implements ITour{
    @ApiProperty({ description: 'id', example: 'null' })
    id: string;
    @ApiProperty({ description: 'Tour name', example: 'test' })
    name: string;
    @ApiProperty({ description: 'Tour\'s description', example: 'test' })
    description: string;
    @ApiProperty({ description: 'Tour\'s operator', example: 'test' })
    tourOperator: string;
    @ApiProperty({ description: 'Tour\'s price', example: 1000 })
    price: number;
    @ApiProperty({ description: 'Url\'s image', example: '' })
    img?: string;
    @ApiProperty({ description: 'Tour\'s date start', example: new Date(2025, 4, 25)})
    date?: Date;
    @ApiProperty({ description: 'Tour\'s type', example: 'single' })
    type?: string;
}

export interface ITour{
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: number;
    img?: string;
    date?: Date;
    type?: string;
}