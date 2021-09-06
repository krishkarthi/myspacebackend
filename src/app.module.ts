import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/photo.entity';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/attendance.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: 'b6kk9yobls0goyy-mongodb.services.clever-cloud.com',
    //   port: 27017,
    //   database: 'b6kk9yobls0goyy',
    //   username: 'urpvvfm5x3o7g3wlrghc',
    //   password: '0FPEhL5IsOWTOjtN0VFo',
    //   entities: [Photo, Users, Attendance],
    //   synchronize: true,
    //   useUnifiedTopology:true
    // }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '172.30.84.86',
      port: 27017,
      database: 'encora',
      username: 'myencora',
      password: 'myencora123',
      entities: [Photo, Users, Attendance],
      synchronize: true,
      useUnifiedTopology:true
    }),
    PhotoModule,
    UsersModule,
    AttendanceModule
  ],
})
export class AppModule {}
