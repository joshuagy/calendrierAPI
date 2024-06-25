import { Module } from '@nestjs/common';
import { CourService } from './cour.service';
import { CourController } from './cour.controller';
import { Cour } from './entities/cour.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Annulation } from 'src/annulation/entities/annulation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cour, Reservation, Annulation])],
  controllers: [CourController],
  providers: [CourService],
  exports: [CourService]
})
export class CourModule {}
