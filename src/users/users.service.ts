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
        var user = await this.usersModel.findOne({ email: options.email });
        console.log("updateUserDetails==>>>");
        console.log(user);
        if(user == undefined){
            return await this.usersModel.save(options);
        }else{
            return await this.usersModel.update({ email: options.email }, options);
        }
    }
}
