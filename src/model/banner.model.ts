import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBannerDto } from '../dto/banner/create-banner.dto';
import { Banner } from '../schema/banner.schema';
import { UpdateBannerDto } from '../dto/banner/update-banner.dto';

@Injectable()
export class BannerModel {
    constructor(@InjectModel(Banner.name) private readonly bannerModel: Model<Banner>) {}
    async create(createBannerDto: CreateBannerDto) {
        const banner = this.bannerModel.create(createBannerDto);
        return (await banner).save();
    }
    async findAllBanner(): Promise<Banner[]> {
        return await this.bannerModel.find().exec();
    }

    async updateBanner(id: string, updateBannerDto: UpdateBannerDto): Promise<Banner> {
        updateBannerDto.updatedAt = new Date();
        return await this.bannerModel.findByIdAndUpdate(id, updateBannerDto, { new: true });
    }
}
