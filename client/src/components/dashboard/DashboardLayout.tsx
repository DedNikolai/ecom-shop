import Link from "next/link";
import { LogoutButton } from "@/components/shared/LogoutButton/LogoutButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Search} from "lucide-react";
import styles from './dashboard.module.css';
import { protectedRoutes } from "@/app/api/client.routes";
import { SideLink } from "./SideLink";
import { NAV } from "./nav";
import { DashBoardSheet } from "./DashBoardSheet";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className={styles.wrapper}>
      {/* Desktop sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.title}>
          MyShop Admin
        </div>
        <Separator />
        <ScrollArea className={styles.scroll}>
          <nav className={styles.nav}>
            {NAV.map(item => (
              <SideLink key={item.href} {...item} />
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile sidebar (Sheet) */}
      <DashBoardSheet />

      {/* Main column */}
      <div className="grid grid-rows-[auto_1fr]">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-white px-3">
          <div className="hidden md:block" />
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:flex items-center">
              <Search className="absolute left-2 h-4 w-4 text-neutral-400" />
              <Input placeholder="Search orders, products..." className="pl-8 w-64" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <span className="hidden sm:inline text-sm">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={protectedRoutes._DASHBOARD_SETTINGS}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <div className="px-2 font-bold"><LogoutButton /></div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="p-4">
          {/* Breadcrumbs (optional) */}
          {/* <Breadcrumb>...</Breadcrumb> */}
          {children}
        </main>
      </div>
    </div>
  );
}
