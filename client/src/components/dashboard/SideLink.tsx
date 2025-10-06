"use client";

import { NavItem } from "@/types/navItem.type";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideLink({ href, label, icon, exact }: NavItem) {
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