import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { SignUpUserDto } from '../dto/auth/signup-user.dto';
import { User } from '../schema/user.schema';
import { UpdateUserDto } from '../dto/user/update-user.dto';

@Injectable()
export class UserModel {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(signUpUserDto: SignUpUserDto) {
        const user = this.userModel.create(signUpUserDto);
        return (await user).save();
    }
    async findUserByPhoneForAuthentication(phone: string) {
        return await this.userModel.findOne({ phone }).exec();
    }
    async findUserByEmailForAuthentication(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }
    async findAllUser(
        page: number,
        pageSize: number,
        sortBy: string,
        sortOrder: 'ASC' | 'DESC' = 'DESC',
        filter: object,
    ): Promise<[User[], number]> {
        const skip = (page - 1) * pageSize;
        const limit = pageSize;
        return await Promise.all([
            this.userModel
                .find(filter)
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ [sortBy]: sortOrder === 'DESC' ? -1 : 1 }),
            this.userModel.countDocuments(),
        ]);
    }
    async findUserById(id: string): Promise<User> {
        return await this.userModel.findById(id).select('-password').exec();
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        updateUserDto.updatedAt = new Date();
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
    async deleteUser(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id);
    }
}
