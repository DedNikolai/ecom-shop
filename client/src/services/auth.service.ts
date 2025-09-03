import { api } from "@/lib/axios";
import { LoginType } from "@/types/login";
import { UserType } from "@/types/user";

export async function login(data: LoginType) {
    const response = await api.post<UserType>('/auth/login', data);
}