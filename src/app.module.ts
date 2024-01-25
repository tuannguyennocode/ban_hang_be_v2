import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './module/category.module';
import { FirebaseModule } from './module/firebase.module';
import { KindModule } from './module/kind.module';
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
        FirebaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
