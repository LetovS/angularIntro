import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role, RoleSchema } from 'src/schemas/role.schema';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
PermissionsModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}