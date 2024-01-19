import { Module } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CategoryController } from '../controller/category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schema/category.schema';
import { CategoryModel } from '../model/category.model';
import { KindModel } from '../model/kind.model';
import { Kind, KindSchema } from '../schema/kind.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Kind.name, schema: KindSchema },
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryModel, KindModel],
})
export class CategoryModule {}
