import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchemaProps {
    @Prop({ default: new Date() })
    createdAt: Date;
    @Prop({ default: new Date() })
    updatedAt: Date;
    @Prop()
    createdBy: string;
    @Prop()
    updatedBy: string;
}
