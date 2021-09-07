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
        console.log("updateUserDetails", user);
        user = options;
        return this.usersModel.save(user);
    }
}
