import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BirthDate } from 'src/entities/birth-date.entity';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, BirthDate])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
