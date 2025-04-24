import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type CartDocument = HydratedDocument<Cart>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Cart{
  @Prop({ type: [{ type: Types.ObjectId, ref: 'OrderItem' }] })
  orders: Types.ObjectId[];

  @Prop({ default: false })
  status: boolean;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ required: true, default: Date.now })
  date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  userId: Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);