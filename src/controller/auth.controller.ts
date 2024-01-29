import { Body, Controller, Post } from '@nestjs/common';
import { SignInUserDto } from '../dto/user/signin-user.dto';
import { SignUpUserDto } from '../dto/user/signup-user.dto';
import { UserService } from '../service/user.service';
import { Public } from '../constant';
// import { CreateUserDto } from '../dto/user/signup-user.dto';
// import { UpdateUserDto } from '../dto/user/update-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post('sign-up')
    signUp(@Body() signUpUserDto: SignUpUserDto) {
        return this.userService.signUp(signUpUserDto);
    }

    @Public()
    @Post('sign-in')
    signIn(@Body() signInUserDto: SignInUserDto) {
        return this.userService.signIn(signInUserDto);
    }
}
