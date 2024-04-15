import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';

import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from "./reservation/entities/reservation.entity";

import { Cour } from "./cour/entities/cour.entity";
import { CourModule } from './cour/cour.module';
import { Annulation } from './annulation/entities/annulation.entity';
import { AnnulationModule } from './annulation/annulation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Reservation, Cour, Annulation],
      synchronize: true,
      logging: true
    }),
    CourModule,
    ReservationModule,
    AnnulationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
