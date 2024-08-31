import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchemaProps } from './base.schema';

@Schema()
export class Banner extends BaseSchemaProps {
    @Prop()
    image: string;
}
export const BannerSchema = SchemaFactory.createForClass(Banner);
