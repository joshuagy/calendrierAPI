import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annulation } from './entities/annulation.entity';
import { CreateAnnulationDto } from './dto/create-annulation.dto';

@Injectable()
export class AnnulationService {
    constructor(
        @InjectRepository(Annulation)
        private annulationRepository: Repository<Annulation>,
    ) {}

    async findAll() {
        return await this.annulationRepository.find({ relations: ['cour'] });
    }
    async create(annulationDto: CreateAnnulationDto): Promise<Annulation> {
        console.log('Creating new annulation with data:', annulationDto);

        const newAnnulation = new Annulation();
        newAnnulation.date_annulation = annulationDto.date_annulation;
        
        // Assurez-vous que l'objet cour est initialisé correctement
        if (!annulationDto.cour || !annulationDto.cour.id) {
            throw new Error('Invalid course data provided');
        }

        newAnnulation.cour = {
            id: annulationDto.cour.id,
            nom: annulationDto.cour.nom,
            jourDansLaSemaine: annulationDto.cour.jourDansLaSemaine,
            reservations: annulationDto.cour.reservations,
            date_exceptionnelle: annulationDto.cour.date_exceptionnelle || null // Assurez-vous que cette valeur est correctement transmise ou définie comme null
          };
          // Créez un objet cour avec juste l'ID nécessaire

        console.log('Prepared entity for insertion:', newAnnulation);

        try {
            const savedAnnulation = await this.annulationRepository.save(newAnnulation);
            console.log('Saved annulation:', savedAnnulation);
            return savedAnnulation;
        } catch (error) {
            console.error('Error saving the annulation:', error);
            throw error;
        }
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
