"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LoginMenu } from "../LoginMenu/LoginMenu";
import { publicRoutes } from "@/app/api/client.routes";

type Props = {
  auth: any;
  categories: { id: string; title: string }[];
};

const menu = [
  { name: "Home", link: `${publicRoutes._HOME}` },
  { name: "About", link: "/about" },
  { name: "Contacts", link: "/contacts" },
];

export default function ClientNavBar({ auth, categories }: Props) {
  return (
    <header className="w-full bg-black text-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* ======== ЛІВО — Catalog ======== */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className=" md:flex gap-2 text-black w-[220px] flex justify-between"
            >
              <div>Catalog</div>
              <Menu className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-2 bg-white text-black rounded-md ">
            <ul className="flex flex-col gap-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`${publicRoutes._CATEGORY}/${cat.id}`}
                    className="block px-3 py-2 rounded-md hover:bg-neutral-100"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        {/* ======== СЕРЕДИНА — Пункти меню ======== */}
        <ul className="hidden md:flex items-center">
          {menu.map((item) => (
            <li className="mx-3" key={item.link}>
              <Link
                href={item.link}
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ======== ПРАВО — Login ======== */}
        <div className="hidden md:flex gap-3 items-center">
          <LoginMenu auth={auth} />
        </div>

        {/* ======== MOBILE ======== */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-black text-white">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-4 text-lg">
              {/* Catalog у вигляді dropdown */}
              <details>
                <summary className="cursor-pointer flex items-center gap-2 font-semibold hover:text-cyan-400">
                  <Menu className="h-4 w-4" />
                  Catalog
                </summary>
                <ul className="ml-6 mt-2 flex flex-col gap-2 text-base">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`${publicRoutes._CATEGORY}/${cat.id}`}
                        className="hover:text-cyan-400"
                      >
                        {cat.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Статичні меню */}
              <ul className="flex flex-col gap-2">
                {menu.map((item) => (
                  <li key={item.link}>
                    <Link href={item.link} className="hover:text-cyan-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t border-neutral-800 my-4" />
              <LoginMenu auth={auth} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
