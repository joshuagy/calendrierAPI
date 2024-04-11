import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cour } from "src/cour/entities/cour.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Cour])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule {}
