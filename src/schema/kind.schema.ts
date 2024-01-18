import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchemaProps } from './base.schema';

@Schema()
export class Kind extends BaseSchemaProps {
    @Prop({ type: String })
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId;
}
export const KindSchema = SchemaFactory.createForClass(Kind);
