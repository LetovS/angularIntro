import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Orders\'s name', example: 'create_user' })
  name: string;

  @IsArray()
  @ApiPropertyOptional({ description: 'Optional description of the permission', example: 'Allows creation of a user' })
  items: [];
}

export class UpdateOrderRequest extends PartialType(CreateOrderRequest) {}