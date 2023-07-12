import { Body, Controller, Get, Param, Put, UseGuards, Request, Res, UnauthorizedException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common/pipes";
//import { Param } from "@nestjs/common/decorators";
import { User } from "src/entities/user.entity";
import { UserType } from "src/enums/user-type.enum";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { RoleGuard } from "../auth/roles.guard";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { UserService } from "./user.service";
import { UserDto } from "src/models/user.model";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { RegisterDto } from "src/models/register.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { environment } from "src/environments/environment";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("getUser/:id")
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Get("emailExists/:email")
    async checkEmail(@Param("email") email: string): Promise<boolean>{
        return await this.userService.checkForEmail(email);
    }

    @UseGuards(LocalAuthGuard)
    @Put("logIn")
    async logIn(@Request() req): Promise<UserDto> {
        await this.userService.updateUser_Online(req.user.id);
        return await this.userService.joinUserData(req.user.id);
    }

    @UseGuards(AuthenticatedGuard)
    @Put("logOut")
    async logOut(@Request() req): Promise<any> {
        await this.userService.updateUser_Offline(req.user.id);
        req.logOut(()=>{
            req.session.cookie.maxAge = 0;            
        });
        return req.session;
    }

    @Post("register")
    async registerUser(@Body() registerDto: RegisterDto): Promise<{id: number}>{
        if(await this.userService.checkForEmail(registerDto.email as string)){
            throw new UnauthorizedException();
        }else{
            return await this.userService.createUser(registerDto);
        }
    }

    @Post("upload-profile-picture/:id")
    //@HttpCode(200)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: environment.profile_pictures_path,
            filename: (req, file, cb) => {
                const filename: string = uuidv4();
                const extension: string = file.originalname.split(".", 2)[1];
                cb(null, `${filename}.${extension}`)
            }
        })}
    ))
    async uploadProfilePicture(@Param("id", ParseIntPipe) id: number, @UploadedFile() profilePicture: Express.Multer.File): Promise<{path: string}>{
        await this.userService.updateProfilePicture(id, profilePicture.filename);
        return {path: environment.server_own_url + environment.user_path_to_profile_picture + profilePicture.filename};
    }
}