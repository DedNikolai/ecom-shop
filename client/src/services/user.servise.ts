// src/services/profile.ts
import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";
import { UpdateUserType, UserType } from "@/types/user";
import toast from "react-hot-toast";

export async function updateProfile(dto: UpdateUserType): Promise<UserType | undefined> {
  try {
    const response = await api.patch<UserType>(serverRoutes._USERS_ME, dto);

    if (response.status === 200) {
        toast.success('Profile was updated');
        return response.data;
    }

  } catch(error: any) {
    console.log(error.response.data.message);
    toast.error('Profile was not updated')
  }
  
}
