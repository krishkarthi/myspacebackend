import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import jwt_decode from "jwt-decode";
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';

export let usersService: UsersService;

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(
        @InjectRepository(Users)
        private readonly usersModel: Repository<Users>,
      ) {
          super();
      }
    
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        let token: string = request['headers']["authorization"];
        let userData = this.getDecodedAccessToken(token);
        // console.log(userData);
        return await this.validateUser(userData);
    }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

      async validateUser(userData){
        // const user = this.usersModel.find(userData.unique_name);
        //   if (user && Date.now() <= userData.exp * 1000) {
          if (Date.now() <= userData.exp * 1000) {
              return true;
          } else {
              return false;
          }
      }
}