import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    constructor(private userService: UserService){
        super();
    }
    async serializeUser(user: User, done: (err: Error, user: any) => void) : Promise<any>{
        await this.userService.updateUser_Online(user.id);
        //return done(null, user); //ovo stavlja u redis
        return done(null, {id: user.id});
    }
    async deserializeUser(payload: any, done: (err: Error, payload: any) => void) {
        //let user: User = await this.userService.getUserById(payload.id)
        //return done(null, user);
        return done(null, payload);
    }
}