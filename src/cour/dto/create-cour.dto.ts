import { IsNotEmpty } from "class-validator";

export class CreateCourDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    nom: string;
  
    @IsNotEmpty()
    jourDansLaSemaine: number;

    date_exceptionnelle?: string;
}
