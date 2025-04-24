import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from 'src/schemas/cart.schema';
import { CreateCartDto, IOrder, UpdateCartDto } from './model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartRepository: Model<Document>) {}
  
  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const createdTour = new this.cartRepository(createCartDto);
    await createdTour.save();
    return createdTour.id;
  }

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find().lean<Cart[]>().exec();
  }

  async findOne(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({userId:id}).lean<Cart>().exec();
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updatedCart = await this.cartRepository
      .findByIdAndUpdate(id, updateCartDto, { new: true })
      .lean<Cart>()
      .exec();

    if (!updatedCart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return updatedCart;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.cartRepository.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return { deleted: true };
  }
}