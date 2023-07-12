import { UserType } from "src/enums/user-type.enum";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BirthDate } from "./birth-date.entity";
import { Description } from "./description.entity";
import { Note } from "./note.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text', nullable: false, unique: true })
    public email: String;
    
    @Column({ type: 'bool', nullable: false })
    public online: boolean;    

    @Column({ type: 'text', nullable: false })
    public firstName: String;

    @Column({ type: 'text', nullable: false })
    public lastName: String;

    //moze i samo string?
    // @Column({ type: 'text', nullable: false })
    // public birthDate: String;
    @OneToOne(() => BirthDate, birthDate => birthDate.user)
    public birthDate: BirthDate;
    
    @Column({ type: 'text', nullable: false })
    public gender: String;

    @Column({ type: 'text', nullable: false })
    public phoneNumber: String;

    @Column({ type: 'text', nullable: false })
    public password: String;

    // @Column()
    // public JWT: String;

    @Column({
        type: 'enum',
        enum: UserType,
        //default: UserType.Patient
      })
    public userType: UserType;

    @Column({ type: 'text', nullable: false })
    public profilePicturePath: String;    

    @OneToOne(() => Note, note => note.patient )
    public note: Note;

    @OneToOne(() => Description, description => description.therapist )
    public description: Description;

    @ManyToOne(() => User, user => user.patients, {onDelete: "SET NULL"}) 
    public therapist: User | null;

    @OneToMany(() => User, user => user.therapist)
    public patients: User[];
}


