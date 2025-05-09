import { ApiProperty } from '@nestjs/swagger';

export class CreateTourRequest implements ITour {
  @ApiProperty({ description: 'id', example: 'null' })
  id: string;
  @ApiProperty({ description: 'Tour name', example: 'test' })
  name: string;
  @ApiProperty({ description: "Tour's description", example: 'test' })
  description: string;
  @ApiProperty({ description: "Tour's operator", example: 'test' })
  tourOperator: string;
  @ApiProperty({ description: "Tour's price", example: 1000 })
  price: number;
  @ApiProperty({ description: "Url's image", example: '' })
  img?: string;
  @ApiProperty({
    description: "Tour's date start",
    example: new Date(2025, 4, 25),
  })
  date?: Date;
  @ApiProperty({ description: "Tour's type", example: 'single' })
  type?: string;
  locationId?: string;
  @ApiProperty({ description: 'Country', example: 'Russia' })
  country?: string;
  @ApiProperty({ description: 'Code of country', example: 'RU' })
  code?: string;
}

export interface ITour {
  id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: number;
  img?: string;
  date?: Date;
  type?: string;
  locationId?: string;
  country?: string;
  code?: string;
}
