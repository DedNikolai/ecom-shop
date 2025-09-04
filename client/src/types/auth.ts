import { Role } from "./role";

export type LoginType = {
    email: string;
    password: string;
}

export type AuthUserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthRegisterType = Omit<AuthUserType, "id" | "role" | "createdAt" | "updatedAt">;
