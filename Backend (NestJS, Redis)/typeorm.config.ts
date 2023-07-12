import { BirthDate } from "src/entities/birth-date.entity";
import { Description } from "src/entities/description.entity";
import { HelpCall } from "src/entities/help-call.entity";
import { Note } from "src/entities/note.entity";
import { Page } from "src/entities/page.entity";
import { Quote } from "src/entities/quotes.entity";
import { Schedule } from "src/entities/schedule.entity";
import { User } from "src/entities/user.entity";
import { ConnectionOptions } from "typeorm";

export const typeOrmConfig: ConnectionOptions = {
    type: "postgres",
    //host: "localhost",
    host: "postgres", 
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "mhc",
    entities: [User, BirthDate, Schedule, Note, Description, Quote, Page, HelpCall],
    synchronize: true
}