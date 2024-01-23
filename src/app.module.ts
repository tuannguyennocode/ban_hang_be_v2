import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './module/category.module';
import { KindModule } from './module/kind.module';
import { Category, CategorySchema } from './schema/category.schema';
import { Kind, KindSchema } from './schema/kind.schema';
import { CategoryModel } from './model/category.model';
import { ProductModule } from './module/product.module';

const ENV = process.env.NODE_ENV;
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DB_HOST, {
            dbName: process.env.DB_NAME,
        }),
        CategoryModule,
        KindModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
