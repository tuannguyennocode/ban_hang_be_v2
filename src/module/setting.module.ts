import { Module } from '@nestjs/common';
import { SettingService } from '../service/setting.service';
import { SettingController } from '../controller/setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from '../schema/setting.schema';
import { SettingModel } from '../model/setting.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }])],
    controllers: [SettingController],
    providers: [SettingService, SettingModel],
})
export class SettingModule {}
