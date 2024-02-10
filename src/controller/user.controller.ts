import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, Request } from '@nestjs/common';
import { Role } from '../constant';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
        @Query('name') name: string,
        @Query('role') role: Role,
    ) {
        let filter = {};
        if (name) {
            filter = { name: { $regex: new RegExp(name, 'i') } };
        }
        if (role) {
            filter = { ...filter, role };
        }
        return this.userService.findAll(page, pageSize, filter);
    }

    @Get('profile')
    getProfile(@Request() req: any) {
        return this.userService.getProfile(req.user.id);
    }
}
