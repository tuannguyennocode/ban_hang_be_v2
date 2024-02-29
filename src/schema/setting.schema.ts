import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchemaProps } from './base.schema';

@Schema()
export class Setting extends BaseSchemaProps {
    @Prop()
    banner: string[];
}
export const SettingSchema = SchemaFactory.createForClass(Setting);
