import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';
import { CategoryModel } from '../model/category.model';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';
import { errorMessages } from '../config/response/errors/custom';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryModel: CategoryModel) {}
    async create(createCategoryDto: CreateCategoryDto) {
        this.categoryModel.create(createCategoryDto);
        return setSuccessResponse('Create category success');
    }

    async findAll(page: number, pageSize: number): Promise<SuccessResponse> {
        const sortBy = 'createdAt';
        const sortOrder = 'ASC';
        const [items, totalElements] = await this.categoryModel.findAllCategory(page, pageSize, sortBy, sortOrder);
        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list category success', { content: items, totalElements, totalPages });
    }

    async findOne(id: string): Promise<SuccessResponse> {
        const category = await this.categoryModel.findCategoryById(id);
        if (!category) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        return setSuccessResponse('Get category success', category);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const categoryUpdate = await this.categoryModel.updateCategory(id, updateCategoryDto);
        if (!categoryUpdate) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        return setSuccessResponse('Update category success');
    }

    async delete(id: string) {
        const categoryDelete = await this.categoryModel.deleteCategory(id);
        if (!categoryDelete) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        return setSuccessResponse('Delete category success');
    }
}
