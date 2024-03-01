import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSettingDto } from '../dto/setting/create-setting.dto';
import { UpdateSettingDto } from '../dto/setting/update-setting.dto';
import { SettingService } from '../service/setting.service';
import { Public } from '../constant';

@Controller('setting')
export class SettingController {
    constructor(private readonly settingService: SettingService) {}

    @Post()
    create(@Body() createSettingDto: CreateSettingDto) {
        return this.settingService.create(createSettingDto);
    }

    @Public()
    @Get()
    findAll() {
        return this.settingService.findAll();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
        return this.settingService.update(id, updateSettingDto);
    }
}
