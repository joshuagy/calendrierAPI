import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Cour } from './entities/cour.entity';
import { Repository, Not, In, IsNull } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from '../reservation/entities/reservation.entity';
import { parseISO, getDay } from 'date-fns';
import { Annulation } from 'src/annulation/entities/annulation.entity';

@Injectable()
export class CourService {


  constructor(
    @InjectRepository(Cour)
    private readonly coursRepository: Repository<Cour>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Annulation)
    private readonly annulationtRepository: Repository<Annulation>,
  ) {
  }

  calculateDayOfWeek(dateStr: string): number {
    const date = parseISO(dateStr);  // Convertit la chaîne de date en objet Date
    const dayOfWeek = getDay(date);  // Obtient le jour de la semaine, 0 pour dimanche, 1 pour lundi, etc.
    return dayOfWeek === 0 ? 7 : dayOfWeek; // Ajuste si vous voulez que Dimanche soit 7 au lieu de 0
  }
  
  async create(createCourDto: CreateCourDto): Promise<void>  {
    if (!createCourDto.nom || !createCourDto.jourDansLaSemaine) {
      throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
    }
  
    if(createCourDto.date_exceptionnelle != null) {
      const dateExceptionnelle = new Date(createCourDto.date_exceptionnelle);
      createCourDto.jourDansLaSemaine = this.calculateDayOfWeek(dateExceptionnelle.toISOString());
    }
  
    const existingcour = await this.coursRepository.findOne({ where: { id: createCourDto.id } });
    if (existingcour) {
        throw new HttpException("cour Already Exist", HttpStatus.CONFLICT);
    }
  
    const cour = this.coursRepository.create({
      ...createCourDto,
      date_exceptionnelle: createCourDto.date_exceptionnelle,
    });
  
    try {
        await this.coursRepository.save(cour);
    } catch (error) {
        throw new HttpException("Error Creating cour", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findAllRegular() {
    return await this.coursRepository.find({
        where: {
        date_exceptionnelle: IsNull(),  // Cela s'assure que la date exceptionnelle est nulle
      },
    });
  }

  async findAll() {
    return await this.coursRepository.find();
  }

  async findOne(id: number) {
    return await this.coursRepository.findOne({ where: { id: id } });
  }

  async findOneByDayRegular(day: number) {
    return await this.coursRepository.find({ where: { jourDansLaSemaine: day, date_exceptionnelle: IsNull() } });
  }

  async findOneByDay(day: number) {
    return await this.coursRepository.find({ where: { jourDansLaSemaine: day} });
  }

  async update(id: number, updateCourDto: UpdateCourDto) {
    const cour = await this.coursRepository.findOne({ where: { id: id } });
    if (!cour) {
      throw new HttpException("cour not found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.coursRepository.update(id, updateCourDto);
      return `Successfully updated cour #${id}`;
    } catch (error) {
      throw new HttpException("Error updating cour", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const cour = await this.coursRepository.findOne({ where: { id: id } });
    if (!cour) {
        throw new HttpException("Cour not found", HttpStatus.NOT_FOUND);
    }

    // Vérifiez s'il y a des réservations pour ce cours
    const reservations = await this.reservationRepository.find({
      where: { cour: { id: id } },
      relations: ['cour'], // Charge la relation 'cour' pour chaque réservation
    });
    
    // Vérifiez s'il y a des annulations pour ce cours
    const annulations = await this.annulationtRepository.find({
      where: { cour: { id: id } },
      relations: ['cour'], // Charge la relation 'cour' pour chaque annulation
    });

    if (reservations.length > 0) {
      for (let i = 0; i < reservations.length; i++) {
        const reservation = reservations[i];
        try {
          await this.reservationRepository.remove(reservation);
        } catch (error) {
          throw new HttpException("Error removing reservation", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }

    if (annulations.length > 0) {
      for (let i = 0; i < annulations.length; i++) {
        const annulation = annulations[i];
        try {
          await this.annulationtRepository.remove(annulation);
        } catch (error) {
          throw new HttpException("Error removing annulation", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }

    try {
      await this.coursRepository.remove(cour);
    } catch (error) {
      throw new HttpException("Error removing course", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findCoursesByDate(date: string): Promise<Cour[]> {
    return await this.coursRepository.find({
      where: { date_exceptionnelle: date }
    });
  }

  async getExceptionalCourses(): Promise<Cour[]> {
    const results = await this.coursRepository.find({
      where: { date_exceptionnelle: Not(IsNull()) },
    });
    console.log(results);  // Log les résultats pour débogage
    return results;
  }
  
  

}

