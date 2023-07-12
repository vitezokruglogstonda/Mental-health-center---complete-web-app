import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BirthDate } from 'src/entities/birth-date.entity';
import { Description } from 'src/entities/description.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BirthDate, Description])],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService]
})
export class AdminModule {}
