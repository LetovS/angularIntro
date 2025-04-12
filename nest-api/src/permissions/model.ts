import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Permission\'s name', example: 'create_user' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Optional description of the permission', example: 'Allows creation of a user' })
  description?: string;
}

export class UpdatePermissionRequest extends PartialType(CreatePermissionRequest) {}