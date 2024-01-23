import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { Category } from '../schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { Kind } from '../schema/kind.schema';
import { Product } from '../schema/product.schema';

@Injectable()
export class CategoryModel {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
        @InjectModel(Kind.name) private readonly kindModel: Model<Kind>,
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
    ) {}
    async create(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryModel.create(createCategoryDto);
        return (await category).save();
    }
    async findAllCategory(
        page: number,
        pageSize: number,
        sortBy: string,
        sortOrder: 'ASC' | 'DESC' = 'DESC',
    ): Promise<[Category[], number]> {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        return await Promise.all([
            this.categoryModel
                .find()
                .skip(skip)
                .limit(limit)
                .sort({ [sortBy]: sortOrder === 'DESC' ? -1 : 1 }),
            this.categoryModel.countDocuments(),
        ]);
    }
    async findCategoryById(id: string): Promise<Category> {
        return await this.categoryModel.findById(id);
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        updateCategoryDto.updatedAt = new Date();
        return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    }
    async updateKinds(categoryId: string, kindId: string) {
        await this.categoryModel.updateOne({ _id: categoryId }, { $push: { kinds: kindId } });
    }
    async deleteCategory(id: string): Promise<Category> {
        const kinds = await this.kindModel.find({ category: new Types.ObjectId(id) });
        for (const kind of kinds) {
            await this.productModel.deleteMany({ kind: kind._id });
        }
        await this.kindModel.deleteMany({ category: new Types.ObjectId(id) });
        return await this.categoryModel.findByIdAndDelete(id);
    }
}
