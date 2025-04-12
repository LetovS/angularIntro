import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateRoleRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Role\'s name', example: 'guest' })
  name: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  @ApiPropertyOptional({
    description: 'Array of permission IDs associated with the role',
    example: ['permissionId_1', 'permissionId_2'],
  })
  permissions?: string[];
}

export class UpdateRoleRequest extends PartialType(CreateRoleRequest) {}

