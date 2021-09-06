import { Body, Controller, Get, Post, UseGuards, Request, HttpException, HttpStatus, Render } from '@nestjs/common';
import { Attendance } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../users/jwt-auth.guard';

@Controller()
export class AttendanceController {
    constructor(public attendanceService: AttendanceService){}
    
    @Post('api/users/updateAttendance')
    async updateAttendance(@Body() attendance: Attendance){
        return this.attendanceService.updateAttendance(attendance);
    }

    @Get('api/users/getAttendanceAll')
    async getAttendanceAll(){
        return this.attendanceService.getAttendanceAll({});
    }

    @UseGuards(JwtAuthGuard)
    @Post('api/users/myAttendance')
    async myAttendance(@Body() user){
        return this.attendanceService.myAttendance(user);
    }

    @Get()
    @Render('attendance')
    async root() {
        console.log(await this.attendanceService.getAttendanceAll({}));
        return { Attendance: await this.attendanceService.getAttendanceAll({}),
        headers : ["User Name", "Email ID", "Client Name", "Working Today", "Session", "Reason for Not Working", "Attendance Declaration", "Date", "Time"] };
    }
}

