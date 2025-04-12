import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './tour.schema';
import { User, UserSchema } from './user.schema';
import { Role, RoleSchema } from './role.schema';
import { Permission, PermissionSchema } from './permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
