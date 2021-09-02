import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
// import { Timestamp } from "rxjs";

// export type AttendanceDocument = Attendance & Document;

@Entity()
export class Attendance{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    user_name: string;

    @Column()
    user_email: string;

    @Column()
    client_name: string;

    @Column()
    working_today: string;

    @Column()
    session: string;

    @Column()
    date: string;

    @Column()
    attendance_declaration: boolean;

    @Column()
    reason_not_working: string;

    @Column()
    time: string;

}

// export const AttendanceSchema = SchemaFactory.createForClass(Attendance);