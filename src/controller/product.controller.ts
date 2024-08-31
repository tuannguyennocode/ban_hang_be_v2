import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateProductDto } from '../dto/product/create-product.dto';
import { UpdateProductDto } from '../dto/product/update-product.dto';
import { ProductService } from '../service/product.service';
import { Public } from '../constant';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Public()
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
        @Query('kindId') kindId: string,
        @Query('categoryId') categoryId: string,
        @Query('name') name: string,
    ) {
        let filter = {};
        if (kindId) {
            filter = { kind: new Types.ObjectId(kindId) };
        }

        if (name) {
            filter = { ...filter, name: { $regex: new RegExp(name, 'i') } };
        }
        return this.productService.findAll(page, pageSize, filter, categoryId);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }
}
