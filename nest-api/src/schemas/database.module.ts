import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './tour.schema';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
