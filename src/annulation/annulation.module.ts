import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnulationService } from './annulation.service';
import { AnnulationController } from './annulation.controller';
import { Annulation } from './entities/annulation.entity';
import { Cour } from 'src/cour/entities/cour.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Annulation, Cour])],
    controllers: [AnnulationController],
    providers: [AnnulationService],
})
export class AnnulationModule {}
