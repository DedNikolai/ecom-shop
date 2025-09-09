'use client'

import Link from "next/link";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { AuthUserType } from "@/types/auth";
import { useSession } from "@/hooks/useSession";
import { protectedRoutes, publicRoutes } from "@/app/api/client.routes";
import styles from './navbar.module.css';

type NavbarTypes = {
    auth: AuthUserType | null;
}

export default function NavBar({auth}: NavbarTypes) {
    const { data: user } = useSession(auth);

    return (
        <header className={styles.header}>
            <nav className="container w-[100%] mx-auto flex items-center gap-4 p-[10px]">
                <Link href={publicRoutes._HOME}>Home</Link>

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
            </nav>
        </header>
    );
}