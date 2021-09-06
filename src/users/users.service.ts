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
        var user = await this.usersModel.findOne(options);
        console.log(user);
        if(!user){
            return await this.usersModel.save(options);
        }else{
            return await this.usersModel.update({ email: options.email }, options);
        }
    }
}
