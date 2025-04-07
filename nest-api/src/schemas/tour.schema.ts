import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type TourDocument = HydratedDocument<Tour>;

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
export class Tour {
  @Prop({ required: true, trim: true, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ required: true, trim: true, minlength: 10 })
  description: string;

  @Prop({ required: true, trim: true })
  tourOperator: string;

  @Prop({ required: true, trim: true })
  price: string;

  @Prop({ default: null })
  img: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ enum: ['single', 'group', 'all'], default: 'all' })
  type: string;

  @Prop({ default: null })
  locationId: string;

  @Prop({ default: null })
  code: string;
}

export const TourSchema = SchemaFactory.createForClass(Tour);

TourSchema.index({ name: 'text', description: 'text' });
