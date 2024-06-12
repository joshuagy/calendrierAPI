import { Module } from '@nestjs/common';
import { CourService } from './cour.service';
import { CourController } from './cour.controller';
import { Cour } from './entities/cour.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cour, Reservation])],
  controllers: [CourController],
  providers: [CourService],
  exports: [CourService]
})
export class CourModule {}
