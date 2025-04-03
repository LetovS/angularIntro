import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9_]+$/
  })
  login: string;

  @Prop({ 
    required: true,
    minlength: 6,
    select: false // Исключаем из выборок по умолчанию
  })
  password: string;

  @Prop({ 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  })
  nickname: string;

  @Prop({ 
    required: true,
    unique: true,
    trim: true,
    lowercase: true
    //match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  })
  email: string;

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Индексы для быстрого поиска
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ login: 1 }, { unique: true });