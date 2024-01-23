import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    serverReady(): string {
        return 'Server is ready!';
    }
}
