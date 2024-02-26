import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../schema/product.schema';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { Kind } from '../schema/kind.schema';
import { Category } from '../schema/category.schema';

@Injectable()
export class ProductModel {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
        @InjectModel(Kind.name) private readonly kindModel: Model<Kind>,
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    ) {}

    async create(createProductDto: CreateProductDto) {
        const product = this.productModel.create(createProductDto);
        (await product).kind = new Types.ObjectId(createProductDto.kindId);
        return (await product).save();
    }

    async findAllProduct(
        page: number,
        pageSize: number,
        sortBy: string,
        sortOrder: 'ASC' | 'DESC' = 'DESC',
        filter: object,
        categoryId: string,
    ): Promise<[Product[], number]> {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        if (categoryId) {
            const category = await this.categoryModel.findById(categoryId);
            const kinds = await this.kindModel.find({ _id: { $in: category.kinds } });
            const productIds = kinds.flatMap((kind) => kind.products);
            filter = { ...filter, _id: { $in: productIds } };
        }
        return await Promise.all([
            this.productModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .populate('kind', 'name category')
                .sort({ [sortBy]: sortOrder === 'DESC' ? -1 : 1 }),
            this.productModel.countDocuments(),
        ]);
    }

    async findProductById(id: string): Promise<Product> {
        return await this.productModel.findById(id).populate('kind', 'name');
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        updateProductDto.updatedAt = new Date();
        return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
    }

    async deleteProduct(id: string): Promise<Product> {
        await this.kindModel.updateMany({ products: id }, { $pull: { products: id } });
        return await this.productModel.findByIdAndDelete(id);
    }
}
