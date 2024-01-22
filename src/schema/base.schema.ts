import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchemaProps {
    @Prop({ default: new Date(), index: true })
    createdAt: Date;
    @Prop({ default: new Date() })
    updatedAt: Date;
    @Prop()
    createdBy: string;
    @Prop()
    updatedBy: string;
}
