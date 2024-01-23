import { Module } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { Kind, KindSchema } from 'src/schema/kind.schema';
import { ProductModel } from 'src/model/product.model';
import { KindModel } from 'src/model/kind.model';
import { CategoryModel } from 'src/model/category.model';
import { Category, CategorySchema } from 'src/schema/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Kind.name, schema: KindSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductModel, KindModel, CategoryModel],
})
export class ProductModule {}
