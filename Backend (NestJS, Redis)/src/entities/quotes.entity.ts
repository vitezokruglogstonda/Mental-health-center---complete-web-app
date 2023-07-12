import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Quote {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'text', nullable: false })
    public quoteText: String;

    @OneToOne(() => User, {onDelete: "CASCADE"})
    @JoinColumn()
    public patient: User;

}