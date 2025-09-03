'use client'

import Link from "next/link";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { AuthUserType } from "@/types/auth";
import { useSession } from "@/hooks/useSession";
import { protectedRoutes, publicRoutes } from "@/app/api/client.routes";

type NavbarTypes = {
    auth: AuthUserType | null;
}

export default function NavBar({auth}: NavbarTypes) {
    const { data: user } = useSession(auth);

    return (
        <header className="border-b bg-white">
            <nav className="container mx-auto flex items-center gap-4 p-3">
                <Link href={publicRoutes._HOME}>Головна</Link>

                <div className="ml-auto flex gap-3">
                    {
                        !user ?
                            <> 
                                <Link href={publicRoutes._LOGIN}>Логін</Link>
                                <div>|</div>
                                <Link href={publicRoutes._REGISTER}>Реєстрація</Link>
                            </> 
                            :
                            <>
                                {
                                    user.role === 'ADMIN' ? <Link href={protectedRoutes._DASHBOARD}>Dashboard (ADMIN)</Link>
                                    : <Link href={protectedRoutes._PROFILE}>Мій кабінет</Link>
                                }
                                <div>|</div>
                                <LogoutButton />
                            </> 

                    }
                </div>
            </nav>
        </header>
    );
}