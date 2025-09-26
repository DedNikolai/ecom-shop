"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/shared/LogoutButton/LogoutButton";
import {
  Sheet, SheetContent, SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ShoppingCart, Package, Users, BarChart2, Settings, LayoutDashboard, Menu, Search, BadgePercent, Truck, ShoppingBagIcon, TargetIcon,
  Blinds
} from "lucide-react";
import styles from './dashboard.module.css';
import { protectedRoutes, publicRoutes } from "@/app/api/client.routes";

type NavItem = { href: string; label: string; icon: React.ReactNode, exact?: boolean };

const NAV: NavItem[] = [
  { href: protectedRoutes._DASHBOARD, label: "Home", icon: <LayoutDashboard className="h-4 w-4" />, exact: true },
  { href: protectedRoutes._DASHBOARD_ITEMS, label: "Items", icon: <TargetIcon className="h-4 w-4" /> },
  { href: protectedRoutes._CATEGORIES, label: "Categories", icon: <Blinds className="h-4 w-4" /> },
  { href: protectedRoutes._PRODUCTS, label: "Products", icon: <Package className="h-4 w-4" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
  { href: "/dashboard/customers", label: "Customers", icon: <Users className="h-4 w-4" /> },
  { href: "/dashboard/discounts", label: "Discounts", icon: <BadgePercent className="h-4 w-4" /> },
  { href: "/dashboard/shipping", label: "Shipping", icon: <Truck className="h-4 w-4" /> },
  { href: "/dashboard/analytics", label: "Analytics", icon: <BarChart2 className="h-4 w-4" /> },
  { href: protectedRoutes._DASHBOARD_SETTINGS, label: "Settings", icon: <Settings className="h-4 w-4" /> },
  { href: publicRoutes._HOME, label: "Shop Page", icon: <ShoppingBagIcon className="h-4 w-4" /> },
];

function SideLink({ href, label, icon, exact }: NavItem) {
  const pathname = usePathname();
    const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition " +
        (active
          ? "bg-[var(--color-bg-element-main)] text-white"
          : "text-neutral-700 hover:bg-neutral-100")
      }
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

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
