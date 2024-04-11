import { IsNotEmpty } from "class-validator";
import { Cour } from '../../cour/entities/cour.entity';


export class CreateReservationDto {
    @IsNotEmpty()
    nomEleve: string;
  
    @IsNotEmpty()
    prenomEleve: string;

    @IsNotEmpty()
    cour: Cour;

    @IsNotEmpty()
    date_reservation: string;
}
