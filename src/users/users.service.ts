import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersModel: Repository<Users>,
      ) {}

    async findOne(options){
        return this.usersModel.find(options);
    }

    async saveUserDetails(options){
        return this.usersModel.save(options);
    }
    async updateUserDetails(options:Users) {
        let user = await this.usersModel.findOne(options.id);
        user.name = options.name;
        user.email = options.email;
        user.mobile = options.mobile;
        user.profile = options.profile;
        user.specialist = options.specialist;
        user.dob = options.dob;
        user.qualification = options.qualification;
        user.degree = options.degree;
        user.fcm_token = options.fcm_token;
        user.azure_token = options.azure_token;
        console.log("updateUserDetails", user);
        return this.usersModel.save(user);
    }
}
