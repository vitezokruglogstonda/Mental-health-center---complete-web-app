import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BirthDate } from 'src/entities/birth-date.entity';
import { Description } from 'src/entities/description.entity';
import { User } from 'src/entities/user.entity';
import { UserType } from 'src/enums/user-type.enum';
import { environment } from 'src/environments/environment';
import { AdminUserListItemDto, UserDto } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {

    public bcrypt;
    public saltRounds: number;

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(BirthDate) private birthDateRepo: Repository<BirthDate>,
        @InjectRepository(Description) private descriptionRepo: Repository<Description>,
    ) { 
        this.bcrypt = require('bcryptjs');
        this.saltRounds = environment.salt_rounds;
    }

    async getUserList(): Promise<AdminUserListItemDto[]> {
        let return_list = [];

        let allUsers: User[] = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.birthDate", "birthDate")
            .leftJoinAndSelect("user.description", "description")
            .leftJoinAndSelect("user.therapist", "therapist")
            .leftJoinAndSelect("user.patients", "patients")
            .where("user.userType != :type", {type: UserType.Admin})
            .getMany();

        allUsers.forEach(user => {

            let userDto : AdminUserListItemDto = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: {
                    year: user.birthDate.year,
                    month: user.birthDate.month,
                    day: user.birthDate.day,
                },
                gender: user.gender,
                userType: user.userType,
                phoneNumber: user.phoneNumber,
                profilePicturePath: environment.server_own_url + environment.user_path_to_profile_picture + user.profilePicturePath,
                therapistID: user.therapist ? user.therapist.id : null,
                description: user.description ? user.description.descriptionText : null,
                numberOfPatients: user.patients ? user.patients.length : null
            }
            return_list.push(userDto);
        })

        return return_list;
    }

    async changeUsersPassword(id: number, password: string) : Promise<AdminUserListItemDto>{
        let hashed_password: string;
        hashed_password = await this.bcrypt.hash(password, this.saltRounds);

        let user: User = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.birthDate", "birthDate")
            .leftJoinAndSelect("user.description", "description")
            .leftJoinAndSelect("user.therapist", "therapist")
            .leftJoinAndSelect("user.patients", "patients")
            .where("user.id = :id", {id: id})
            .getOne();

        user.password = hashed_password;
        await this.userRepo.save(user);

        return {
            id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: {
                    year: user.birthDate.year,
                    month: user.birthDate.month,
                    day: user.birthDate.day,
                },
                gender: user.gender,
                userType: user.userType,
                phoneNumber: user.phoneNumber,
                profilePicturePath: environment.server_own_url + environment.user_path_to_profile_picture + user.profilePicturePath,
                therapistID: user.therapist ? user.therapist.id : null,
                description: user.description ? user.description.descriptionText : null,
                numberOfPatients: user.patients ? user.patients.length : null
        };
    }

    async deleteUser(id: number): Promise<number>{
        await this.userRepo.delete(id);
        return id;
    }

    async addNewUser(newUser: AdminUserListItemDto, password: string): Promise<AdminUserListItemDto>{
        let hashed_password: string;
        hashed_password = await this.bcrypt.hash(password, this.saltRounds);

        const user: User = this.userRepo.create({
            email: newUser.email,
            online: false,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            gender: newUser.gender,
            phoneNumber: newUser.phoneNumber,
            password: hashed_password,
            userType: newUser.userType,
            profilePicturePath: environment.default_profile_picture
        });
        await this.userRepo.save(user);

        const userDate: BirthDate = this.birthDateRepo.create({
            year: newUser.birthDate.year,
            month: newUser.birthDate.month,
            day: newUser.birthDate.day,
            user: user
        });
        await this.birthDateRepo.save(userDate);

        let userDescription: Description = null;
        if(newUser.userType === UserType.Therapist && newUser.description.length > 0){
            userDescription = this.descriptionRepo.create({
                descriptionText: newUser.description,
                therapist: user
            });
            await this.descriptionRepo.save(userDescription);
        }

        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: {
                year: userDate.year,
                month: userDate.month,
                day: userDate.day
            },
            gender: user.gender,
            userType: user.userType,
            phoneNumber: user.phoneNumber,
            profilePicturePath: environment.server_own_url + environment.user_path_to_profile_picture + user.profilePicturePath,
            therapistID: null,
            description: userDescription ? userDescription.descriptionText : null,
            numberOfPatients: 0
        }
    }
}
