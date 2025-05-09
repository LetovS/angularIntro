import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission, PermissionSchema } from 'src/schemas/permission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService, MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])]
})
export class PermissionsModule {}