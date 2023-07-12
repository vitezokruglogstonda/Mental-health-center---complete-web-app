import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'text', nullable: true })
    public noteText: String | null;

    @OneToOne(() => User, user => user.note, {onDelete: "CASCADE"})
    @JoinColumn()
    public patient: User;
}