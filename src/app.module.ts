import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AtGuard } from './config/auth/guard';
import { AdminRolePermissionMiddleware } from './config/middleware';
import { CategoryModule } from './module/category.module';
import { FirebaseModule } from './module/firebase.module';
import { KindModule } from './module/kind.module';
import { ProductModule } from './module/product.module';
import { UserModule } from './module/user.module';

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
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
        JwtService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AdminRolePermissionMiddleware).exclude(
            { path: 'category', method: RequestMethod.GET },
            // { path: 'category/:id', method: RequestMethod.GET },
            // { path: 'kind', method: RequestMethod.GET },
            // { path: 'kind/:id', method: RequestMethod.GET },
            // { path: 'product', method: RequestMethod.GET },
            // { path: 'product/:id', method: RequestMethod.GET },
            'auth/(.*)',
        );
        // .forRoutes('*');
    }
}
