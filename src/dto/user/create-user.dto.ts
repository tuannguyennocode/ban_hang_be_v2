import { Role } from '../../constant';
import { BaseDto } from '../base.dto';

export class CreateUserDto extends BaseDto {
    phone: string;
    email: string;
    name: string;
    role: Role;
    password: string;
    passwordConfirm: string;
}
