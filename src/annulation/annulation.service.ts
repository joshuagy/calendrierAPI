import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annulation } from './entities/annulation.entity';

@Injectable()
export class AnnulationService {
    constructor(
        @InjectRepository(Annulation)
        private annulationRepository: Repository<Annulation>,
    ) {}

    async findAll() {
        return await this.annulationRepository.find({ relations: ['cour'] });
    }

    async create(annulation: Annulation) {
        return await this.annulationRepository.save(annulation);
    }

    async remove(id: number): Promise<void> {
        await this.annulationRepository.delete(id);
    }

    async findOne(id: number) {
        return await this.annulationRepository.findOne({ where: { id } });
    }

    async getAnnulationsForDate(date: string): Promise<Annulation[]> {
        return await this.annulationRepository.find({
          where: {
            date_annulation: date
          },
          relations: ['cour'] 
        });
    }
}
