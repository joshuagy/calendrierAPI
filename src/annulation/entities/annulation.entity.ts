import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cour } from '../../cour/entities/cour.entity';  // Assurez-vous que le chemin d'accès est correct

@Entity("Annulation")
export class Annulation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cour) // Suppression de la propriété "cour => cour.annulations"
    @JoinColumn({ name: 'cour_id' }) // Assurez-vous que la colonne de jointure est correctement nommée
    cour: Cour;
    
    @Column()
    date_annulation: string;
}
