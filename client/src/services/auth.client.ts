import { api } from "@/lib/axios";
import { AuthUserType, LoginType } from "@/types/auth";
import toast from "react-hot-toast";

export async function login(data: LoginType) {
    try {
        const response = await api.post<AuthUserType>('/auth/login', data);

        if(response.status === 200) {
            toast.success('Authorization Success')
            return response.data
        }

        toast.error('Authorization Failed');
        return null
    } catch(error: any) {
        toast.error('Invalid email or password')
    }
}
export async function authMe(): Promise<AuthUserType | undefined> {
    try {
        const response = await api.get<AuthUserType>('/auth/me')

        if (response.status === 200) {
            return response.data
        }
    } catch(error: any) {
        console.log(error.message)
    }
}
