import { EntityState } from "@ngrx/entity";

export interface HelpCallListItem{
    id: number | null;
    guestName: String;
    guestPhoneNumber: String;
    processed: boolean;
}

export interface HelpCallListState extends EntityState<HelpCallListItem>{

}