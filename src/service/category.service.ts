import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { CategoryModel } from '../model/category.model';
import { setSuccessResponse } from '../config/response/success';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryModel: CategoryModel) {}
    async create(createCategoryDto: CreateCategoryDto) {
        this.categoryModel.create(createCategoryDto);
        return setSuccessResponse('Create category success');
    }

    findAll() {
        return `This action returns all category`;
    }

    findOne(id: number) {
        return `This action returns a #${id} category`;
    }

    // update(id: number, updateCategoryDto: UpdateCategoryDto) {
    //     return `This action updates a #${id} category`;
    // }

    remove(id: number) {
        return `This action removes a #${id} category`;
    }
}
