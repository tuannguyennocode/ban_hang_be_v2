import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class BaseSchemaProps {
    _id: mongoose.Types.ObjectId;
    @Prop({ default: new Date(), index: true })
    createdAt: Date;
    @Prop({ default: new Date() })
    updatedAt: Date;
    @Prop()
    createdBy: string;
    @Prop()
    updatedBy: string;
}
