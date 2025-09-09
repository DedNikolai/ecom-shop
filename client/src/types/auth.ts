import { Role } from "./role";
import { UserType } from "./user";

export type LoginType = {
    email: string;
    password: string;
}

export type AuthRegisterType = Omit<UserType, "id" | "role" | "createdAt" | "updatedAt">;
