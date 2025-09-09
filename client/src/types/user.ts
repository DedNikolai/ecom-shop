import { Role } from "./role";

export type LoginType = {
    email: string;
    password: string;
}

export type UserType = {
    id: string,
    firstName: string
    lastName: string
    email: string
    phone: string,
    role: Role
    createdAt: Date
    updatedAt: Date
}

export type UpdateUserType = Omit<UserType, 'id' | 'role' | 'createdAt' | 'updatedAt'>