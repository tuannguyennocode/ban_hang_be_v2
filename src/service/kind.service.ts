import { ConflictException, Injectable } from '@nestjs/common';
import { CreateKindDto } from '../dto/kind/create-kind.dto';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';
import { KindModel } from '../model/kind.model';
import { CategoryModel } from '../model/category.model';
import { errorMessages } from '../config/response/errors/custom';
import { UpdateKindDto } from '../dto/kind/update-kind.dto';

@Injectable()
export class KindService {
    constructor(
        private readonly kindModel: KindModel,
        private readonly categoryModel: CategoryModel,
    ) {}

    async create(createKindDto: CreateKindDto): Promise<SuccessResponse> {
        const categoryId = createKindDto.categoryId;
        const category = await this.categoryModel.findCategoryById(categoryId);
        if (!category) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        const kind = await this.kindModel.create(createKindDto);
        await this.categoryModel.updateKinds(categoryId, kind.id);
        return setSuccessResponse('Create kind success');
    }
    async findAll(page: number, pageSize: number, filter: object): Promise<SuccessResponse> {
        const sortBy = 'createdAt';
        const sortOrder = 'ASC';
        const [items, totalElements] = await this.kindModel.findAllKind(page, pageSize, sortBy, sortOrder, filter);
        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list kind success', { content: items, totalElements, totalPages });
    }

    async findOne(id: string): Promise<SuccessResponse> {
        const kind = await this.kindModel.findKindById(id);
        if (!kind) {
            throw new ConflictException(errorMessages.kind.notFound);
        }
        return setSuccessResponse('Get kind success', kind);
    }

    async update(id: string, updateKindDto: UpdateKindDto): Promise<SuccessResponse> {
        const kindUpdate = await this.kindModel.updateKind(id, updateKindDto);
        if (!kindUpdate) {
            throw new ConflictException(errorMessages.kind.notFound);
        }
        return setSuccessResponse('Update kind success');
    }

    async delete(id: string): Promise<SuccessResponse> {
        const kindDelete = await this.kindModel.deleteKind(id);
        if (!kindDelete) {
            throw new ConflictException(errorMessages.kind.notFound);
        }
        return setSuccessResponse('Delete kind success');
    }
}
