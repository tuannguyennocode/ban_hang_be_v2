import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { BaseSchemaProps } from './base.schema';

export type CompanyDocument = HydratedDocument<Category>;

@Schema()
export class Category extends BaseSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop()
    name: string;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Kind' }] })
    kinds: Types.ObjectId[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);
