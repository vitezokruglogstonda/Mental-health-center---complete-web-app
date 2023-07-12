import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Description {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'text', nullable: false })
    public descriptionText: String;

    @OneToOne(() => User, user => user.description, {onDelete: "CASCADE"})
    @JoinColumn()
    public therapist: User;
}