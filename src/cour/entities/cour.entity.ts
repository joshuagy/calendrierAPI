import { Reservation } from "src/reservation/entities/reservation.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("Cour")
export class Cour{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nom: string;
  
    @Column()
    jourDansLaSemaine: number;

    @OneToMany(() => Reservation, (reservation) => reservation.cour)
    reservations: Reservation[];
}
