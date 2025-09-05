import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";
import { AuthRegisterType, AuthUserType, LoginType } from "@/types/auth";
import toast from "react-hot-toast";

export async function login(data: LoginType) {
    try {
        const response = await api.post<AuthUserType>(serverRoutes._AUTH_LOGIN, data);

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
        const response = await api.get<AuthUserType>(serverRoutes._AUTH_ME)

        if (response.status === 200) {
            return response.data
        }
    } catch(error: any) {
        console.log(error.message)
    }
}

export async function register(data: AuthRegisterType) {
    try {
        const response = await api.post(serverRoutes._AUTH_REGISTER, data);

        if (response.status === 201) {
            toast.success('Registration success, please login')
            return response.data
        }
    } catch(error: any) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}


