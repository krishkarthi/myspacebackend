import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

// export type UsersDocument = Users & Document;

@Entity()
export class Users{

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column('boolean', {default: false})
    email_verify: boolean;

    @Column()
    mobile: number;

    @Column('boolean', {default: false})
    mobile_verify: boolean;

    @Column('boolean', {default: false})
    user_status: boolean;

    @Column()
    password: string;

    @Column('string', {default: null})
    profile: string;

    @Column('string', {default: null})
    specialist: string;

    @Column('string', {default: null})
    dob: Date;

    @Column('string', {default: null})
    qualification: string;

    @Column('string', {default: null})
    degree: string;

    @Column('string', {default: null})
    fcm_token: string;
}