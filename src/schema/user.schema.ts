import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchemaProps } from './base.schema';
import { Role } from '../constant';

@Schema()
export class User extends BaseSchemaProps {
    @Prop()
    phone: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    name: string;
    @Prop({ enum: Role, default: Role.USER })
    role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
