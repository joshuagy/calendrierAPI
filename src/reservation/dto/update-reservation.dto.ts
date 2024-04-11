import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
    prenomEleve?: string;
    nomEleve?: string;
    date_reservation?: string;
    jour?: string;
}
