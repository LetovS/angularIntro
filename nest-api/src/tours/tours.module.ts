import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { Tour, TourSchema } from 'src/schemas/tour.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}])],
    providers: [ToursService],
    controllers: [ToursController]
})
export class ToursModule {}
