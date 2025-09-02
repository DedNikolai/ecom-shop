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
        toast.error(error.message)
    }
}