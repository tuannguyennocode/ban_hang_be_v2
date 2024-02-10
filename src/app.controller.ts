import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './constant';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    serverReady(): string {
        return this.appService.serverReady();
    }
}
