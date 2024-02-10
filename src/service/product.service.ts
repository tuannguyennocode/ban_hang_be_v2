import { ConflictException, Injectable } from '@nestjs/common';
import { errorMessages } from '../config/response/errors/custom';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';
import { ProductModel } from '../model/product.model';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { KindModel } from '../model/kind.model';
import { UpdateProductDto } from '../dto/product/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly productModel: ProductModel,
        private readonly kindModel: KindModel,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<SuccessResponse> {
        const kindId = createProductDto.kindId;
        const kind = await this.kindModel.findKindById(kindId);
        if (!kind) {
            throw new ConflictException(errorMessages.kind.notFound);
        }
        const product = await this.productModel.create(createProductDto);
        await this.kindModel.updateProducts(kindId, product.id);
        return setSuccessResponse('Create product success');
    }
    async findAll(page: number, pageSize: number, filter: object): Promise<SuccessResponse> {
        const sortBy = 'createdAt';
        const sortOrder = 'ASC';
        const [items, totalElements] = await this.productModel.findAllProduct(
            page,
            pageSize,
            sortBy,
            sortOrder,
            filter,
        );
        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list product success', { content: items, totalElements, totalPages });
    }

    async findOne(id: string): Promise<SuccessResponse> {
        const product = await this.productModel.findProductById(id);
        if (!product) {
            throw new ConflictException(errorMessages.product.notFound);
        }
        return setSuccessResponse('Get product success', product);
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<SuccessResponse> {
        const productUpdate = await this.productModel.updateProduct(id, updateProductDto);
        if (!productUpdate) {
            throw new ConflictException(errorMessages.product.notFound);
        }
        return setSuccessResponse('Update product success');
    }

    async delete(id: string): Promise<SuccessResponse> {
        const productDelete = await this.productModel.deleteProduct(id);
        if (!productDelete) {
            throw new ConflictException(errorMessages.product.notFound);
        }
        return setSuccessResponse('Delete product success');
    }
}
