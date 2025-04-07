import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Double, HydratedDocument, now } from 'mongoose';
import { max } from 'rxjs';

export type CountryDocument = HydratedDocument<Country>;

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
export class Country {
  @Prop({ required: true, length: max })
  flag_url: string;

  @Prop({ required: true })
  iso_code2: string;

  @Prop({ required: false })
  iso_code3: string;

  @Prop({ required: true })
  name_ru: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.index({ name: 'text', description: 'text' });
