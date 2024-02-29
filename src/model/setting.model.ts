import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSettingDto } from '../dto/setting/create-setting.dto';
import { Setting } from '../schema/setting.schema';
import { UpdateSettingDto } from '../dto/setting/update-setting.dto';

@Injectable()
export class SettingModel {
    constructor(@InjectModel(Setting.name) private readonly settingModel: Model<Setting>) {}
    async create(createSettingDto: CreateSettingDto) {
        const setting = this.settingModel.create(createSettingDto);
        return (await setting).save();
    }
    async findAllSetting(): Promise<Setting[]> {
        return await this.settingModel.find().exec();
    }

    async updateSetting(id: string, updateSettingDto: UpdateSettingDto): Promise<Setting> {
        updateSettingDto.updatedAt = new Date();
        return await this.settingModel.findByIdAndUpdate(id, updateSettingDto, { new: true });
    }
}
