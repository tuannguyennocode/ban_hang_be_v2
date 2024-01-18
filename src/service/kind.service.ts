import { ConflictException, Injectable } from '@nestjs/common';
import { CreateKindDto } from '../dto/kind/create-kind.dto';
// import { UpdateKindDto } from '../dto/kind/update-kind.dto';
import { setSuccessResponse } from '../config/response/success';
import { KindModel } from '../model/kind.model';
import { CategoryModel } from '../model/category.model';
import { errorMessages } from '../config/response/errors/custom';

@Injectable()
export class KindService {
    constructor(
        private readonly kindModel: KindModel,
        private readonly categoryModel: CategoryModel,
    ) {}

    async create(createKindDto: CreateKindDto) {
        const categoryId = createKindDto.categoryId;
        if (!this.categoryModel.findCategoryById(categoryId)) {
            throw new ConflictException(errorMessages.category.notFound);
        }
        const kind = await this.kindModel.create(createKindDto);
        await this.categoryModel.updateKinds(categoryId, kind.id);
        return setSuccessResponse('Create kind success');
    }

    // findAll() {
    //     return `This action returns all kind`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} kind`;
    // }

    // update(id: number, updateKindDto: UpdateKindDto) {
    //     return `This action updates a #${id} kind`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} kind`;
    // }
}
