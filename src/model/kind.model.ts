import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { Kind } from '../schema/kind.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateKindDto } from '../dto/kind/create-kind.dto';
import { UpdateKindDto } from '../dto/kind/update-kind.dto';
import { Category } from '../schema/category.schema';

@Injectable()
export class KindModel {
    constructor(
        @InjectModel(Kind.name) private readonly kindModel: Model<Kind>,
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    ) {}

    async create(createKindDto: CreateKindDto) {
        const kind = this.kindModel.create(createKindDto);
        (await kind).category = new Types.ObjectId(createKindDto.categoryId);
        return (await kind).save();
    }

    async findAllKind(
        page: number,
        pageSize: number,
        sortBy: string,
        sortOrder: 'ASC' | 'DESC' = 'DESC',
        filter: object,
    ): Promise<[Kind[], number]> {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        return await Promise.all([
            this.kindModel
                .find(filter)
                .skip(skip)
                .limit(limit)
                .populate('category', 'name')
                .sort({ [sortBy]: sortOrder === 'DESC' ? -1 : 1 }),
            this.kindModel.countDocuments(),
        ]);
    }

    async findKindById(id: string): Promise<Kind> {
        return await this.kindModel.findById(id).populate('category', 'name');
    }

    async updateKind(id: string, updateCategoryDto: UpdateKindDto): Promise<Kind> {
        updateCategoryDto.updatedAt = new Date();
        return await this.kindModel.findByIdAndUpdate(id, updateCategoryDto, { new: true });
    }

    async deleteKind(id: string): Promise<Kind> {
        await this.categoryModel.updateMany({ kinds: id }, { $pull: { kinds: id } });
        return await this.kindModel.findByIdAndDelete(id);
    }
}
