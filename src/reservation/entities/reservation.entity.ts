import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cour } from '../../cour/entities/cour.entity';

@Entity("Reservation")
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomEleve: string;

  @Column()
  prenomEleve: string;

  @ManyToOne(() => Cour)
  @JoinColumn({ name: 'courId' })
  cour: Cour;

  @Column()
  date_reservation: string;
}
