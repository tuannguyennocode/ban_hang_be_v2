import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { Category } from '../schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from '../dto/category/create-category.dto';

@Injectable()
export class CategoryModel {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}
    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryModel.create(createCategoryDto);
        return (await category).save();
    }
    async findCategoryById(id: string): Promise<Category> {
        return await this.categoryModel.findById(id);
    }

    async updateCategory(id: string, category: Category): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
    }
    async updateKinds(categoryId: string, kindId: string) {
        await this.categoryModel.updateOne({ _id: categoryId }, { $push: { kinds: kindId } });
    }
    async deleteCategory(id: string): Promise<Category> {
        return await this.categoryModel.findByIdAndDelete(id);
    }
}
