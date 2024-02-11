import { Role } from '../../constant';
import { BaseDto } from '../base.dto';

export class SignUpUserDto extends BaseDto {
    phone: string;
    email: string;
    name: string;
    role: Role;
    password: string;
    passwordConfirm: string;
}
