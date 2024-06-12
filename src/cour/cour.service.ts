import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Cour } from './entities/cour.entity';
import { Repository, Not, In, IsNull } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from '../reservation/entities/reservation.entity';

@Injectable()
export class CourService {


  constructor(
    @InjectRepository(Cour)
    private readonly coursRepository: Repository<Cour>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {
  }

  async create(createCourDto: CreateCourDto): Promise<void>  {
    if (!createCourDto.nom || !createCourDto.jourDansLaSemaine) {
      throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
    }
    const existingcour = await this.coursRepository.findOne({ where: { id: createCourDto.id } });
    if (existingcour) {
        throw new HttpException("cour Already Exist", HttpStatus.CONFLICT);
    }
    const cour = this.coursRepository.create(createCourDto);
    try {
        await this.coursRepository.save(cour);
    } catch (error) {
        throw new HttpException("Error Creating cour", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.coursRepository.find();
  }

  async findOne(id: number) {
    return await this.coursRepository.findOne({ where: { id: id } });
  }

  async findOneByDay(day: number) {
    return await this.coursRepository.find({ where: { jourDansLaSemaine: day } });
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

    try {
      await this.coursRepository.remove(cour);
    } catch (error) {
      throw new HttpException("Error removing course", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

