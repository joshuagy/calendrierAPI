import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AnnulationService } from './annulation.service';
import { Annulation } from './entities/annulation.entity';

@Controller('annulation')
export class AnnulationController {
    constructor(private readonly annulationService: AnnulationService) {}

    @Get()
    getAllAnnulations(): Promise<Annulation[]> {
        return this.annulationService.findAll();
    }

    @Post()
    createAnnulation(@Body() annulation: Annulation): Promise<Annulation> {
        return this.annulationService.create(annulation);
    }

    @Delete(':id')
    removeAnnulation(@Param('id') id: number): Promise<void> {
        return this.annulationService.remove(id);
    }

    @Get(':id')
    getOneAnnulation(@Param('id') id: number): Promise<Annulation> {
        return this.annulationService.findOne(id);
    }

    @Get('/date/:date')
    getAnnulationsForDate(@Param('date') date: string): Promise<Annulation[]> {
        return this.annulationService.getAnnulationsForDate(date);
    }
}
