import { EntityState } from "@ngrx/entity";
import { UserType } from "./user";

export interface SidenavListItem{
    id: number;
    title: String;
    route: String;
    permissions: UserType[];
}

export interface SidenavInfoState extends EntityState<SidenavListItem>{

}