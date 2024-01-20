import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Cho phép truy cập có danh tính (đối với các cookie hoặc chứng thực)
    });
    await app.listen(5000);
}
bootstrap();
