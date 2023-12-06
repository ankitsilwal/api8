import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../dto/user.dto";

export const UserRoles = (...roles: UserRole[]) => SetMetadata("roles", roles);
