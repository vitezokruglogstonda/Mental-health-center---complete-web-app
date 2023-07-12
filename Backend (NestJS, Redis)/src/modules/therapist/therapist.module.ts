import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { User } from 'src/entities/user.entity';
import { TherapistController } from './therapist.controller';
import { TherapistService } from './therapist.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Schedule, Note])],
    providers: [TherapistService],
    controllers: [TherapistController],
    exports: [TherapistService]
})
export class TherapistModule {}
