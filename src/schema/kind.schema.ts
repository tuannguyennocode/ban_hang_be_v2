import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchemaProps } from './base.schema';

@Schema()
export class Kind extends BaseSchemaProps {
    @Prop()
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    products: Types.ObjectId[];
}
export const KindSchema = SchemaFactory.createForClass(Kind);
