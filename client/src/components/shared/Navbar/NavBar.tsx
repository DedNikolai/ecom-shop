"use client";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import styles from './navbar.module.css';
import { api } from "@/lib/axios";
import { LogoutButton } from "../LogoutButton/LogoutButton";


export default function NavBar() {

    return (
        <header className="border-b bg-white">
            <nav className="container mx-auto flex items-center gap-4 p-3">
                <Link href="/">Головна</Link>
                <Link href="/profile">Мій кабінет</Link>
                <Link href="/dashboard">Dashboard (ADMIN)</Link>
                <div className="ml-auto flex gap-3">
                <Link href="/login">Логін</Link>
                <Link href="/register">Реєстрація</Link>
                <LogoutButton />
                </div>
            </nav>
        </header>
    );
}