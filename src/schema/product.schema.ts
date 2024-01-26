import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchemaProps } from './base.schema';

@Schema()
export class Product extends BaseSchemaProps {
    @Prop()
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Kind' })
    kind: Types.ObjectId;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    size: string;

    @Prop()
    color: string;

    @Prop()
    material: string;

    @Prop()
    image: string[];

    @Prop()
    quantity: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
