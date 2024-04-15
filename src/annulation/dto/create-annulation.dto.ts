import { IsNotEmpty } from "class-validator";
import { Cour } from '../../cour/entities/cour.entity';


export class CreateAnnulationDto {
    @IsNotEmpty()
    cour: Cour;

    @IsNotEmpty()
    date_annulation: string;
}
