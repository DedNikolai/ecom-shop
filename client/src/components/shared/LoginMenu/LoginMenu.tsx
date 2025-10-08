'use client'

import Link from "next/link";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { protectedRoutes, publicRoutes } from "@/app/api/client.routes";
import { UserType } from "@/types/user";
import { useSession } from "@/hooks/useSession";

type Props = {
    auth: UserType | null;
}


export function LoginMenu({auth}: Props) {
    const { data: user } = useSession(auth);
        
    return (
        <div className="ml-auto flex gap-3">
        {
            !user ?
                <> 
                    <Link href={publicRoutes._LOGIN}>Login</Link>
                    <div>|</div>
                    <Link href={publicRoutes._REGISTER}>Registreation</Link>
                </> 
                :
                <>
                    {
                        user.role === 'ADMIN' ? <Link href={protectedRoutes._DASHBOARD}>Dashboard</Link>
                        : <Link href={protectedRoutes._PROFILE}>Profile</Link>
                    }
                    <div>|</div>
                    <LogoutButton />
                </> 

        }
    </div>
    )
}