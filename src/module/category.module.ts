import { Module } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { CategoryController } from '../controller/category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schema/category.schema';
import { CategoryModel } from '../model/category.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
    controllers: [CategoryController],
    providers: [CategoryService, CategoryModel],
})
export class CategoryModule {}
