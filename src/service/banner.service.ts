import { Injectable } from '@nestjs/common';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';
import { CreateBannerDto } from '../dto/banner/create-banner.dto';
import { UpdateBannerDto } from '../dto/banner/update-banner.dto';
import { BannerModel } from '../model/banner.model';

@Injectable()
export class BannerService {
    constructor(private readonly bannerModel: BannerModel) {}
    async create(createBannerDto: CreateBannerDto): Promise<SuccessResponse> {
        await this.bannerModel.create(createBannerDto);
        return setSuccessResponse('Create banner success');
    }

    async findAll() {
        const banner = await this.bannerModel.findAllBanner();
        console.log(banner);
        return setSuccessResponse('Get list banner success', { content: banner });
    }

    async update(id: string, updateBannerDto: UpdateBannerDto) {
        await this.bannerModel.updateBanner(id, updateBannerDto);
        return setSuccessResponse('Update banner success');
    }
}
