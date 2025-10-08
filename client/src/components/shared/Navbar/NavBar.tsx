import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { LoginMenu } from "../LoginMenu/LoginMenu";
import { publicRoutes } from "@/app/api/client.routes";
import { UserType } from "@/types/user";
import { fetchCategories } from "@/services/category.service";

export default async function NavBar({ auth }: { auth: UserType | null }) {
  const categories = await fetchCategories();

  return (
    <header className="w-full bg-black text-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Ліворуч — Home */}
        <Link
          href={publicRoutes._HOME}
          className="text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition"
        >
          Home
        </Link>

        {/* Десктопне меню */}
        {categories?.length ? (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-6">
              {categories.map((cat: any) => (
                <NavigationMenuItem key={cat.id}>
                    <NavigationMenuLink asChild>
                    <Link
                        href={`/categories/${cat.id}`}
                        className="hover:text-cyan-400 transition"
                    >
                        {cat.title}
                    </Link>
                    </NavigationMenuLink>

                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        ) : null}

        {/* Праворуч — логін меню (клієнтське) */}
        <div className="hidden md:flex gap-3 items-center">
          <LoginMenu auth={auth} />
        </div>

        {/* Мобільне меню */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="bg-black text-white">
            <SheetHeader aria-describedby="">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-4 mt-6 text-lg">
              <Link
                href={publicRoutes._HOME}
                className="hover:text-cyan-400"
              >
                Home
              </Link>

              {categories.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="hover:text-cyan-400"
                >
                  {cat.title}
                </Link>
              ))}

              <div className="border-t border-gray-700 my-4" />
              <LoginMenu auth={auth} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
