import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'text', nullable: false })
    public title: String;

    @Column({ type: 'text', nullable: false })
    public route: String;

    @Column('int', { array: true })
    public permissions: number[];    
}