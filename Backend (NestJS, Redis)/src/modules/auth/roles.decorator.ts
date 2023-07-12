import { SetMetadata } from "@nestjs/common";
import { UserType } from "src/enums/user-type.enum";

export const Roles = (...roles: UserType[]) => SetMetadata("roles", roles);