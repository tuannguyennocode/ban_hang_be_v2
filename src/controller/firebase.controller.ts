import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FirebaseService } from '../service/firebase.service';
import { Public } from '../constant';

@Controller('file')
export class FirebaseController {
    constructor(private readonly firebaseService: FirebaseService) {}
    
    @Public()
    @Get('download/:fileName')
    async downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
        try {
            const fileBuffer = await this.firebaseService.downloadFile(fileName);

            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${fileName}"`,
            });
            res.send(fileBuffer);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.firebaseService.uploadFile(file);
    }
}
