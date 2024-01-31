import { Body, ConflictException, Injectable } from '@nestjs/common';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';
import { errorMessages } from '../config/response/errors/custom';
import { JWT_SECRET } from '../constant';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../model/user.model';
import { SignUpUserDto } from '../dto/user/signup-user.dto';
import { SignInUserDto } from '../dto/user/signin-user.dto';
import { User } from '../schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        private readonly userModel: UserModel,
    ) {}
    async getTokens(user: any) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id: user._id,
                    role: user.role,
                    state: user.state,
                },
                {
                    secret: JWT_SECRET,
                    expiresIn: '365d',
                },
            ),
            this.jwtService.signAsync(
                {
                    id: user._id,
                },
                {
                    secret: JWT_SECRET,
                    expiresIn: '30d',
                },
            ),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
            tokenType: 'Bearer Token',
        };
    }
    async hashByBcrypt(data: string) {
        return bcrypt.hash(data, 10);
    }

    async signIn(signInUserDto: SignInUserDto): Promise<SuccessResponse> {
        const { username, password } = signInUserDto;
        const userByPhone = await this.userModel.findUserByPhoneForAuthentication(username);
        const userByEmail = await this.userModel.findUserByEmailForAuthentication(username);
        let user: User;
        if (userByPhone == null && userByEmail == null) {
            throw new ConflictException(errorMessages.user.wrongCredentials);
        } else if (userByPhone != null) {
            user = userByPhone;
        } else if (userByEmail != null) {
            user = userByEmail;
        }

        if (await bcrypt.compare(password, user?.password)) {
            const tokens = await this.getTokens(user);
            const response = { ...tokens, role: user.role };
            return setSuccessResponse('Sign in success', response);
        } else {
            throw new ConflictException(errorMessages.user.wrongCredentials);
        }
    }
    async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<SuccessResponse> {
        const { password, email, phone, passwordConfirm } = signUpUserDto;
        const userByPhone = await this.userModel.findUserByPhoneForAuthentication(phone);
        const userByEmail = await this.userModel.findUserByEmailForAuthentication(email);
        if (userByPhone) {
            throw new ConflictException(errorMessages.user.phoneAlreadyExist);
        } else if (userByEmail) {
            throw new ConflictException(errorMessages.user.emailAlreadyExist);
        } else if (password !== passwordConfirm) {
            throw new ConflictException(errorMessages.user.passwordConfirmNotMatch);
        } else {
            signUpUserDto.password = await this.hashByBcrypt(password);
            const user = await this.userModel.create(signUpUserDto);
            return setSuccessResponse('Sign up success', user);
        }
    }

    async findAll(page: number, pageSize: number, filter: object): Promise<SuccessResponse> {
        const sortBy = 'createdAt';
        const sortOrder = 'ASC';
        const [items, totalElements] = await this.userModel.findAllUser(page, pageSize, sortBy, sortOrder, filter);
        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list category success', { content: items, totalElements, totalPages });
    }

    async getProfile(id: string): Promise<SuccessResponse> {
        const user = await this.userModel.findUserById(id);
        if (!user) {
            throw new ConflictException(errorMessages.user.notFound);
        } else {
            return setSuccessResponse('Get profile success', user);
        }
    }
}
