import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { errorMessages } from '../response/errors/custom';
import { Role } from '../../constant';
import { decodeToken } from '../auth/token';

@Injectable()
export class AdminRolePermissionMiddleware implements NestMiddleware {
    use(req: any, res: any, next: NextFunction) {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.slice(7);
            if (token) {
                const infoToken: any = decodeToken(token);
                if (infoToken.role === Role.ADMIN) {
                    next();
                } else {
                    throw new ConflictException(errorMessages.auth.notAllowed);
                }
            }
        }
    }
}
