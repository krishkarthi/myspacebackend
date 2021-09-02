import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {

    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceModel: Repository<Attendance>,
      ) {}

    async updateAttendance(options){
        const query = { user_email: options.user_email, date: options.date };
        const update = { $set: options};
        // return this.attendanceModel.updateOne(query, update, {upsert: true})
        var user = await this.attendanceModel.findOne(options);
        console.log(user);
        if(!user){
            user = await this.attendanceModel.save(options);
        }else{
            return { "error" : "you are already submitted." };
        }
        return user;
    }

    async getAttendanceAll(options){
        return this.attendanceModel.find(options);
    }

    async myAttendance(options){
        return this.attendanceModel.find(options);
    }
}
