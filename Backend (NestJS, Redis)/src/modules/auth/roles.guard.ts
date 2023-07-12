import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { request } from "http";
import { User } from "src/entities/user.entity";
import { UserType } from "src/enums/user-type.enum";
import { Repository } from "typeorm";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, @InjectRepository(User) private userRepo: Repository<User>) { }
    async canActivate(context: ExecutionContext) {
        let requiredRole = this.reflector.getAllAndOverride<UserType[]>("roles", [
            context.getHandler(),
            context.getClass()
        ]);
        const request = context.switchToHttp().getRequest();
        if (request.user) {
            let user: User = await this.userRepo.createQueryBuilder("user")
                .where("user.id = :userId", { userId: request.user.id })
                .getOne();
            if (requiredRole.includes(user.userType)) 
                return true;
        }
        return false;
    }
}