import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../../../constant';

type JwtPayload = {
    sub: string;
    email: string;
};

@Injectable()
export class AtStrategies extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([]),
            secretOrKey: JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        return payload;
    }
}
