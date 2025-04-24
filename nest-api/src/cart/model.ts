import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export interface IOrder {
  orders: IOrderItem[];
  status: boolean;
  total: number;
  date: Date;
  userId: string;
  id: string
}

export interface IOrderItem{  
  id?: string;
  name: string;
  quantity: number;
  price: number;
}

class CartItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  @ApiProperty({ description: 'orders', example: [] })
  orders: CartItemDto[];

  @IsBoolean()
  @ApiProperty({ description: 'status', example: 'false' })
  status: boolean;

  @IsNumber()
  @ApiProperty({ description: 'total', example: 0 })
  total: number;

  @IsString()
  @ApiProperty({ description: 'userId', example: '67f0efa21713a1d282a4108d' })
  userId: string;
}

export class UpdateCartDto extends PartialType(CreateCartDto) {}