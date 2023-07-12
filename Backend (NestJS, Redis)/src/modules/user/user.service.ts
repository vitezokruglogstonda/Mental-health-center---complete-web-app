import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BirthDate } from 'src/entities/birth-date.entity';
import { User } from 'src/entities/user.entity';
import { UserType } from 'src/enums/user-type.enum';
import { environment } from 'src/environments/environment';
import { RegisterDto } from 'src/models/register.model';
import { UserDto } from 'src/models/user.model';
import { Repository } from 'typeorm';

import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from "path";

@Injectable()
export class UserService {

    public bcrypt;
    public saltRounds: number;

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(BirthDate) private birthDateRepo: Repository<BirthDate>,
    ) {
        this.bcrypt = require('bcryptjs');
        this.saltRounds = environment.salt_rounds;
    }

    async getUserByEmail(email: string) {
        return await this.userRepo.createQueryBuilder("user")
            .where("user.email = :userEmail", { userEmail: email })
            .getOne();
    }

    async updateUser_Online(id: number) {
        let user = await this.getUserById(id);
        user.online = true;
        await this.userRepo.save(user);
    }

    async updateUser_Offline(id: number) {
        let user = await this.getUserById(id);
        user.online = false;
        await this.userRepo.save(user);
    }

    getUserById(id: number): Promise<User> {
        //return this.userRepo.findOneById(id);
        return this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.patients", "patients")
            .where("user.id = :userId", { userId: id })
            .getOne();
    }

    async joinUserData(id: number): Promise<UserDto> {
        let fetchedUser: User = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.birthDate", "birthDate")
            .leftJoinAndSelect("user.therapist", "therapist")
            .leftJoinAndSelect("user.note", "note")
            .leftJoinAndSelect("user.description", "description")
            .where("user.id = :userId", { userId: id })
            .getOne();
        return {
            id: id,
            email: fetchedUser.email,
            firstName: fetchedUser.firstName,
            lastName: fetchedUser.lastName,
            birthDate: {
                day: fetchedUser.birthDate.day,
                month: fetchedUser.birthDate.month,
                year: fetchedUser.birthDate.year
            },
            gender: fetchedUser.gender,
            userType: fetchedUser.userType,
            phoneNumber: fetchedUser.phoneNumber,
            profilePicturePath: environment.server_own_url + environment.user_path_to_profile_picture + fetchedUser.profilePicturePath,
            therapistID: fetchedUser.therapist ? fetchedUser.therapist.id : null,
            note: fetchedUser.note ? fetchedUser.note.noteText : null,
            description: fetchedUser.description ? fetchedUser.description.descriptionText : null
        };
    }

    async checkForEmail(email: string): Promise<boolean> {
        let user: User = await this.userRepo.createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne();
        if (user)
            return true;
        return false;
    }

    async updateProfilePicture(id: number, picturePath: string) {
        let user: User = await this.userRepo.createQueryBuilder("user")
            .where("user.id = :userId", { userId: id })
            .getOne();
        user.profilePicturePath = picturePath;
        await this.userRepo.save(user);
    }

    async createUser(registerDto: RegisterDto): Promise<{id: number}> {

        let hashed_password: string;
        hashed_password = await this.bcrypt.hash(registerDto.password, this.saltRounds);

        let profilePictureUrl: string = environment.default_profile_picture;

        const newUser: User = this.userRepo.create({
            email: registerDto.email,
            online: true,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            gender: registerDto.gender,
            phoneNumber: registerDto.phoneNumber,
            password: hashed_password,
            userType: UserType.Patient,
            profilePicturePath: profilePictureUrl
        });
        await this.userRepo.save(newUser);

        const newUserDate: BirthDate = this.birthDateRepo.create({
            year: registerDto.birthDate.year,
            month: registerDto.birthDate.month,
            day: registerDto.birthDate.day,
            user: newUser
        });
        await this.birthDateRepo.save(newUserDate);

        // const id: number = (await this.userRepo.createQueryBuilder("user")
        //     .where("user.email = :email", {email: registerDto.email})
        //     .getOne()).id;

        // return {
        //     id: newUser.id,
        //     email: registerDto.email,
        //     firstName: registerDto.firstName,
        //     lastName: registerDto.lastName,
        //     birthDate: {
        //         year: registerDto.birthDate.year,
        //         month: registerDto.birthDate.month,
        //         day: registerDto.birthDate.day,
        //     },
        //     gender: registerDto.gender,
        //     userType: UserType.Patient,
        //     phoneNumber: registerDto.phoneNumber,
        //     profilePicturePath: profilePictureUrl,
        //     therapistID: null,
        //     note: null,
        //     description: null
        // };

        return {id: newUser.id};
    }


}
