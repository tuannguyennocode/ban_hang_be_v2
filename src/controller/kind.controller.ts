import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateKindDto } from '../dto/kind/create-kind.dto';
import { KindService } from '../service/kind.service';
import { UpdateKindDto } from '../dto/kind/update-kind.dto';

@Controller('kind')
export class KindController {
    constructor(private readonly kindService: KindService) {}

    @Post()
    create(@Body() createKindDto: CreateKindDto) {
        return this.kindService.create(createKindDto);
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
        @Query('categoryId') categoryId: string,
        @Query('name') name: string,
    ) {
        let filter = {};
        if (categoryId) {
            filter = { category: new Types.ObjectId(categoryId) };
        }
        if (name) {
            filter = { ...filter, name: { $regex: new RegExp(name, 'i') } };
        }
        return this.kindService.findAll(page, pageSize, filter);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.kindService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateKindDto: UpdateKindDto) {
        return this.kindService.update(id, updateKindDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.kindService.delete(id);
    }
}
