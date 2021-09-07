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
        // var user = await this.usersModel.findOne({ email: options.email });
        // if(user.email == options.email){
        //     console.log("updateUserDetails===>", true)
            // return await this.usersModel.update(options.id, options);
        // }else{
        //     console.log("updateUserDetails===>", false)
        //     return await this.usersModel.save(options);
        // }

        let user = await this.usersModel.findOne(options.id);
        console.log("updateUserDetails", user);
        user.profile = options.profile;
        return this.usersModel.save(user);
    }
}
