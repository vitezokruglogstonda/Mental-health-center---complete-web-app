import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { AdminUserListState, UserListItem } from "src/app/models/admin";
import * as AdminActions from "./admin.action";

export const adminUserListAdapter: EntityAdapter<UserListItem> = createEntityAdapter<UserListItem>();

export const initialUserListState: AdminUserListState = adminUserListAdapter.getInitialState({
});

export const adminReducer = createReducer(
    initialUserListState,
    on(AdminActions.loadUserList, (state) => ({
        ...state
    })),
    on(AdminActions.loadUserListSuccess, (state, {users}) => {
        return adminUserListAdapter.addMany(users, state);
    }),
    on(AdminActions.deleteUser, (state, {userId}) => ({
        ...state
    })),
    on(AdminActions.deleteUserSuccess, (state, {userId}) => {
        return adminUserListAdapter.removeOne(userId, state);
    }),
    on(AdminActions.addNewUser, (state, {data, picture}) => ({
        ...state
    })),
    on(AdminActions.addNewUserSuccess, (state, {newUser}) => {
        return adminUserListAdapter.addOne(newUser, state);
    }),
    on(AdminActions.changeUsersPassword, (state, {userId, password}) => ({
        ...state
    })),
    on(AdminActions.changeUsersPasswordSuccess, (state, {userUpdate}) => {
        return adminUserListAdapter.updateOne({id: (userUpdate.id as number), changes: userUpdate}, state);
    }),
);