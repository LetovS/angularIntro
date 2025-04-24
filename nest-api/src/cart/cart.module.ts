import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart, CartSchema } from 'src/schemas/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }])]
})
export class CartModule {}
