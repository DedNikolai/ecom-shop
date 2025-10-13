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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  
  return (
    <header className="w-full bg-black text-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* ======== ЛІВО — Catalog ======== */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="hidden md:flex justify-between gap-2 text-black w-[220px] bg-white hover:bg-neutral-100"
            >
              <div className="font-semibold">Catalog</div>
              <Menu className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[220px] p-2 bg-white text-black rounded-md shadow-md"
          >
            <ul className="flex flex-col gap-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`${publicRoutes._CATEGORY}/${cat.id}`}
                    onClick={() => setOpen(false)}
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

        {/* ======== MOBILE ======== */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild aria-describedby="">
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            aria-describedby=""
            side="left"
            className="bg-black text-white flex flex-col justify-between p-0"
          >
            <div className="p-6 overflow-y-auto">
              <SheetHeader aria-describedby="">
                <SheetTitle className="text-white text-xl font-semibold mb-4">
                  My Shop
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-4 text-lg">
                {/* Catalog з акордеоном */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="catalog" className="border-none">
                    <AccordionTrigger className="flex justify-between items-center font-semibold text-lg hover:text-cyan-400">
                      <div className="flex items-center gap-2">
                        <Menu className="h-5 w-5" />
                        Catalog
                      </div>
                      {/* <ChevronDown className="h-4 w-4" /> */}
                    </AccordionTrigger>
                    <AccordionContent className="ml-8 mt-2 flex flex-col gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`${publicRoutes._CATEGORY}/${cat.id}`}
                          onClick={() => setIsOpen(false)} 
                          className="text-base hover:text-cyan-400 transition"
                        >
                          {cat.title}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Статичні меню */}
                <ul className="flex flex-col gap-3 mt-2">
                  {menu.map((item) => (
                    <li key={item.link}>
                      <Link
                        href={item.link}
                        className="hover:text-cyan-400 text-lg font-medium"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

                {/* ======== ПРАВО — Login ======== */}
        <div className="md:flex gap-3 items-center">
          <LoginMenu auth={auth} />
        </div>
      </div>
    </header>
  );
}
