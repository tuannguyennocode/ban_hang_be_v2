import { Module } from '@nestjs/common';
import { KindService } from '../service/kind.service';
import { KindController } from '../controller/kind.controller';
import { KindModel } from '../model/kind.model';
import { Category, CategorySchema } from '../schema/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Kind, KindSchema } from '../schema/kind.schema';
import { CategoryModel } from '../model/category.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Kind.name, schema: KindSchema },
        ]),
    ],
    controllers: [KindController],
    providers: [KindService, KindModel, CategoryModel],
})
export class KindModule {}
