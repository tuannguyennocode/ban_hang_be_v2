import { Body, ConflictException, Injectable } from '@nestjs/common';
import { SuccessResponse, setSuccessResponse } from '../config/response/success';
import { errorMessages } from '../config/response/errors/custom';
import { JWT_SECRET, Role } from '../constant';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../model/user.model';
import { SignUpUserDto } from '../dto/auth/signup-user.dto';
import { SignInUserDto } from '../dto/auth/signin-user.dto';
import { User } from '../schema/user.schema';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';

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
            const response = { ...tokens, role: user.role, user: user };
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

    async create(@Body() createUserDto: CreateUserDto): Promise<SuccessResponse> {
        const { password, email, phone, passwordConfirm } = createUserDto;
        const userByPhone = await this.userModel.findUserByPhoneForAuthentication(phone);
        const userByEmail = await this.userModel.findUserByEmailForAuthentication(email);
        if (userByPhone) {
            throw new ConflictException(errorMessages.user.phoneAlreadyExist);
        } else if (userByEmail) {
            throw new ConflictException(errorMessages.user.emailAlreadyExist);
        } else if (password !== passwordConfirm) {
            throw new ConflictException(errorMessages.user.passwordConfirmNotMatch);
        } else {
            createUserDto.password = await this.hashByBcrypt(password);
            const user = await this.userModel.create(createUserDto);
            return setSuccessResponse('Create user success', user);
        }
    }

    async findAll(page: number, pageSize: number, filter: object): Promise<SuccessResponse> {
        const sortBy = 'createdAt';
        const sortOrder = 'DESC';
        const [items, totalElements] = await this.userModel.findAllUser(page, pageSize, sortBy, sortOrder, {
            ...filter,
            role: Role.USER,
        });
        const totalPages = Math.ceil(totalElements / pageSize);
        return setSuccessResponse('Get list user success', { content: items, totalElements, totalPages });
    }

    async getProfile(id: string): Promise<SuccessResponse> {
        const user = await this.userModel.findUserById(id);
        if (!user) {
            throw new ConflictException(errorMessages.user.notFound);
        } else {
            return setSuccessResponse('Get profile success', user);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<SuccessResponse> {
        const userUpdate = await this.userModel.updateUser(id, updateUserDto);
        if (!userUpdate) {
            throw new ConflictException(errorMessages.user.notFound);
        }
        return setSuccessResponse('Update user success');
    }

    async delete(id: string): Promise<SuccessResponse> {
        const userDelete = await this.userModel.deleteUser(id);
        if (!userDelete) {
            throw new ConflictException(errorMessages.user.notFound);
        }
        return setSuccessResponse('Delete user success');
    }
}
