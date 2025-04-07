import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User, UserMethods>;

export interface UserMethods {
  checkPassword(candidatePassword: string): Promise<boolean>;
}

@Schema({ 
  timestamps: true, 
  toJSON: { 
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }, 
  toObject: { 
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  } 
})
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
    select: false,
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
    lowercase: true,
  })
  email: string;

  @Prop({ default: 'user' })
  role: string;
}

// Создаем схему
export const UserSchema = SchemaFactory.createForClass(User);

// Добавляем индексы
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ login: 1 }, { unique: true });

// Добавляем хук для автоматического хеширования пароля перед сохранением
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Добавляем метод проверки пароля
UserSchema.methods.checkPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};
