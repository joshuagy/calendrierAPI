import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Cour } from "src/cour/entities/cour.entity";

@Injectable()
export class ReservationService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Cour)
    private readonly usersRepository: Repository<Cour>
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<void> {
    const { nomEleve, prenomEleve, cour, date_reservation } = createReservationDto;
    if (!nomEleve || !prenomEleve || !cour || !date_reservation) {
      throw new HttpException("Missing fields", HttpStatus.BAD_REQUEST);
    }
    
    const courVerified = await this.usersRepository.findOne({
      where: { id: createReservationDto.cour.id },
      relations: []
    });
    if (!courVerified) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const existingReservation = await this.reservationRepository.findOne({ 
      where: { nomEleve, prenomEleve, cour, date_reservation } 
    });
    if (existingReservation) {
      throw new HttpException("Reservation already exists", HttpStatus.CONFLICT);
    }
    const reservation = this.reservationRepository.create(createReservationDto);
    try {
      await this.reservationRepository.save(reservation);
    } catch (error) {
      throw new HttpException("Error creating reservation", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.reservationRepository.find();
  }

  async findOne(id: number) {
    const reservation = await this.reservationRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new HttpException("Reservation not found", HttpStatus.NOT_FOUND);
    }
    return reservation;
  }

  async findByDate(day: string) {
    const reservations = await this.reservationRepository.find({ where: { date_reservation: day } });
    console.log(reservations);
    if (!reservations) {
      throw new HttpException("Reservation not found", HttpStatus.NOT_FOUND);
    }
    return reservations;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.reservationRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new HttpException("Reservation not found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.reservationRepository.update(id, updateReservationDto);
      return `Successfully updated reservation #${id}`;
    } catch (error) {
      throw new HttpException("Error updating reservation", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const reservation = await this.reservationRepository.findOne({ where: { id } });
    if (!reservation) {
        throw new HttpException("Reservation not found", HttpStatus.NOT_FOUND);
    }
    await this.reservationRepository.remove(reservation);
  }
}
