import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KindService } from '../service/kind.service';
import { CreateKindDto } from '../dto/kind/create-kind.dto';
// import { UpdateKindDto } from '../kind/dto/update-kind.dto';

@Controller('kind')
export class KindController {
    constructor(private readonly kindService: KindService) {}

    @Post()
    create(@Body() createKindDto: CreateKindDto) {
        return this.kindService.create(createKindDto);
    }

    // @Get()
    // findAll() {
    //     return this.kindService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.kindService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateKindDto: UpdateKindDto) {
    //     return this.kindService.update(+id, updateKindDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.kindService.remove(+id);
    // }
}
