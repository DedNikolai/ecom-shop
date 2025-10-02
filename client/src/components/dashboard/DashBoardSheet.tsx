"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { SideLink } from "./SideLink";
import { useState } from "react";
import styles from './dashboard.module.css';
import { NAV } from "./nav";

export function DashBoardSheet() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden m-2">
                <Menu className={styles.menu} />
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
            <div className="flex h-14 items-center gap-2 px-4">
                <div className="font-semibold">MyShop Admin</div>
            </div>
            <Separator />
            <ScrollArea className="h-[calc(100dvh-56px)] p-2">
                <nav className="grid gap-1" onClick={() => setOpen(false)}>
                {NAV.map(item => (
                    <SideLink key={item.href} {...item} />
                ))}
                </nav>
            </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}