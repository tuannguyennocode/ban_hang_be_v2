import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Request,
} from '@nestjs/common';
import { Role } from '../constant';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';

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

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.getProfile(id);
    }
}
