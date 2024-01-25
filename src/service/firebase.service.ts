import { ConflictException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';
import { Readable } from 'stream';

@Injectable()
export class FirebaseService {
    private readonly storage: admin.storage.Storage;

    constructor() {
        const credential = {
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        };

        admin.initializeApp({
            credential: admin.credential.cert(credential),
            storageBucket: process.env.STORAGE_BUCKET,
        });
        this.storage = admin.storage();
    }

    getStorageInstance(): admin.storage.Storage {
        return this.storage;
    }

    async downloadFile(fileName: string): Promise<Buffer> {
        const storage = this.getStorageInstance();
        const bucket = storage.bucket();
        const file = bucket.file(fileName);

        try {
            const [fileBuffer] = await file.download();
            return fileBuffer;
        } catch (error) {
            throw new ConflictException(error);
        }
    }

    async uploadFile(file: Express.Multer.File): Promise<SuccessResponse> {
        const storage = this.getStorageInstance();
        const bucket = storage.bucket();
        const fileName = `${Date.now()}_${file.originalname}`;
        const fileUpload = bucket.file(fileName);
        try {
            const fileReadStream = Readable.from(file.buffer);
            fileReadStream.pipe(
                fileUpload.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                }),
            );
            return setSuccessResponse('Upload file success', { fileName });
        } catch (error) {
            throw new ConflictException(error);
        }
    }
}
