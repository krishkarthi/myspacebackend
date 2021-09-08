import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class AttendanceService {

    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceModel: Repository<Attendance>,
      ) {}

    async updateAttendance(options){
        const query = { email: options.email, date: options.date };
        const update = { $set: options};
        // return this.attendanceModel.updateOne(query, update, {upsert: true})
        var user = await this.attendanceModel.findOne(query);
        console.log(user);
        if(!user){
            user = await this.attendanceModel.save(options);
        }else{
            return { "message" : "You are already submitted the attendance today." };
        }
        return { "message" : "You have successfullysubmitted you attendance. " };
    }

    async getAttendanceAll(options){
        return this.attendanceModel.find(options);
    }

    async myAttendance(options){
        return this.attendanceModel.find(options);
    }

    async downloadAttendance(res){
        const excel = require("exceljs");

        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet(moment().format("DD_MM_YYYY"));

        worksheet.columns = [
        { header: "User Name", key: "name", width: 20 },
        { header: "Email ID", key: "email", width: 30 },
        { header: "Client Name", key: "client_name", width: 15 },
        { header: "Working Today", key: "working_today", width: 15 },
        { header: "Working Session", key: "session", width: 35 },
        { header: "Date", key: "date", width: 15 },
        { header: "Attendance Declaration", key: "attendance_declaration", width: 22 },
        { header: "Resone for Not Working", key: "reason_not_working", width: 25 },
        { header: "Punch In Time", key: "time", width: 25 }
        ];

        // Add Array Rows
        let attendanceData = await this.attendanceModel.find({});
        worksheet.addRows(attendanceData);

        // res is a Stream object
        res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "MyEncora-Attendance-"+ moment().format("DD_MM_YYYY")+".xlsx"
        );

        return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
        });
    }
}
