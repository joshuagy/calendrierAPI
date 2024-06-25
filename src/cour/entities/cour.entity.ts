import { Annulation } from "src/annulation/entities/annulation.entity";
import { Reservation } from "src/reservation/entities/reservation.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";

@Entity("Cour")
export class Cour{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nom: string;
  
    @Column()
    jourDansLaSemaine: number;

    @Column({nullable: true })
    date_exceptionnelle: string | null;

    @OneToMany(() => Reservation, (reservation) => reservation.cour)
    reservations: Reservation[];

}
   
