import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from '../dto/setting/create-setting.dto';
import { UpdateSettingDto } from '../dto/setting/update-setting.dto';
import { SettingModel } from '../model/setting.model';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';

@Injectable()
export class SettingService {
    constructor(private readonly settingModel: SettingModel) {}
    async create(createSettingDto: CreateSettingDto): Promise<SuccessResponse> {
        await this.settingModel.create(createSettingDto);
        return setSuccessResponse('Create setting success');
    }

    async findAll() {
        const setting = await this.settingModel.findAllSetting();
        return setSuccessResponse('Get list setting success', setting);
    }

    async update(id: string, updateSettingDto: UpdateSettingDto) {
        await this.settingModel.updateSetting(id, updateSettingDto);
        return setSuccessResponse('Update setting success');
    }
}
