import { Role } from '../../constant';

export class SignUpUserDto {
    phone: string;
    email: string;
    name: string;
    role: Role;
    password: string;
    passwordConfirm: string;
}
