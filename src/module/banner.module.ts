import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from '../schema/banner.schema';
import { BannerService } from '../service/banner.service';
import { BannerModel } from '../model/banner.model';
import { BannerController } from '../controller/banner.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Banner.name, schema: BannerSchema }])],
    controllers: [BannerController],
    providers: [BannerService, BannerModel],
})
export class BannerModule {}
