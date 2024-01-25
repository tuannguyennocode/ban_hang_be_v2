import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from '../service/firebase.service';
import { Response } from 'express';

@Controller('file')
export class FirebaseController {
    constructor(private readonly firebaseService: FirebaseService) {}

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
            res.status(500).send('Download file failed');
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.firebaseService.uploadFile(file);
    }
}
