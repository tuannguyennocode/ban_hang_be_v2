import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../controller/auth.controller';
import { UserController } from '../controller/user.controller';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schema/product.schema';
import { Category, CategorySchema } from '../schema/category.schema';
import { Kind, KindSchema } from '../schema/kind.schema';
import { User, UserSchema } from '../schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Kind.name, schema: KindSchema },
            { name: Category.name, schema: CategorySchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, UserModel, JwtService],
})
export class UserModule {}
