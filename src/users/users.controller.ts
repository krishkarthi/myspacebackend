import { Body, Controller, Get, Post, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('api/users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
        ){
    }

    @UseGuards(JwtAuthGuard)
    @Get('frontend')
    async frontend(){
        return this.usersService.findOne({});
    }

    @Post('registeration')
    async registeration(@Body() users: Users){
        return this.usersService.saveUserDetails(users);
    }

    @UseGuards(JwtAuthGuard)
    @Post('updateUser')
    async updateUser(@Body() users: Users){
        return this.usersService.updateUserDetails(users);
    }

    @Post('login')
    async login(@Body() req) {
        return this.usersService.findOne(req).then((user:any)=>{
            if(user){
                const payload:any = { name: user.name, email: user.email };
                return { 
                    access_tocken : this.jwtService.sign(payload),
                    user: user
                };
            }else{
                return { access_tocken : user};
            }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('validateUser')
    async validateUser(@Body() users){
        return {
            validateUser: true,
            user: this.usersService.findOne({email: users.email})
        };
    }
}
