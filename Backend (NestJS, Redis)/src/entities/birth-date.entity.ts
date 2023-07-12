import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class BirthDate {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'int', nullable: false })
    public year: number;

    @Column({ type: 'int', nullable: false })
    public month: number;

    @Column({ type: 'int', nullable: false })
    public day: number;

    @OneToOne( ()=> User, user => user.birthDate, {onDelete: "CASCADE"})
    @JoinColumn()
    public user: User;
}
