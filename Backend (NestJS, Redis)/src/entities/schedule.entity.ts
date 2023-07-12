import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'text', nullable: false })
    public date: String;

    @Column({ type: 'int', nullable: false })
    public appointmentNumber: number;

    @ManyToOne(() => User, {onDelete: "CASCADE"})
    @JoinColumn()
    public patient: User;

    @ManyToOne(() => User, {onDelete: "CASCADE"})
    @JoinColumn()
    public therapist: User;

}