import { ConflictException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../../constant';
import { errorMessages } from '../../response/errors/custom';

export const decodeToken = (token: string) => {
    try {
        const decodedToken = verify(token, JWT_SECRET);
        return decodedToken;
    } catch (error) {
        console.error(error);
        throw new ConflictException(errorMessages.auth.decodeTokenFailed);
    }
};
