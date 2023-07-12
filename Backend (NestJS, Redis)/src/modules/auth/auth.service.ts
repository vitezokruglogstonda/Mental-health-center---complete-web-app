import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { compare, hash } from 'bcryptjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

    public bcrypt;

    constructor(private userService: UserService){
        this.bcrypt = require("bcryptjs");
    }

    async validateUser(userEmail: string, userPassword: string): Promise<User | null>{
        let user: User = await this.userService.getUserByEmail(userEmail);
        if(user){
            let val = await this.bcrypt.compare(userPassword, user.password);
            if(!val){
                return null;
            }
            return user;
        }else{
            return null;
        }
    }

    async checkUserExistence(userEmail: string): Promise<User | null>{
        let user: User = await this.userService.getUserByEmail(userEmail);
        if(user){
            return user;
        }else{
            return null;
        }
    }
}
