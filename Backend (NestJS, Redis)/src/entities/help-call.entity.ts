import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HelpCall {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'text', nullable: false })
    public guestName: String;

    @Column({ type: 'text', nullable: false })
    public guestPhoneNumber: String;

    @Column({ type: 'bool', nullable: false })
    public processed: boolean;    
}