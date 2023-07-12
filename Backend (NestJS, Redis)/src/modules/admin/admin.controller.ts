import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserType } from 'src/enums/user-type.enum';
import { RegisterDto } from 'src/models/register.model';
import { AdminUserListItemDto, ChangePasswordDto, UserDto } from 'src/models/user.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Admin)
    @Get("get-user-list")
    async getUserList(): Promise<AdminUserListItemDto[]> {
        return await this.adminService.getUserList();
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Admin)
    @Put("change-users-password")
    async changeUsersPassword(@Body() user: ChangePasswordDto): Promise<AdminUserListItemDto> {
        return await this.adminService.changeUsersPassword(user.id, user.password);
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Admin)
    @Delete("delete-user/:id")
    async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<number> {
        return await this.adminService.deleteUser(id);
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Admin)
    @Post("add-user")
    async addNewUser(@Body("uploadObject") newUser: AdminUserListItemDto, @Body("password") password: string): Promise<AdminUserListItemDto> {
        return await this.adminService.addNewUser(newUser, password);
    }
    
}
