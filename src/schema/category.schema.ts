import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchemaProps } from './base.schema';

@Schema()
export class Category extends BaseSchemaProps {
    @Prop()
    name: string;
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Kind' }] })
    kinds: Types.ObjectId[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);
