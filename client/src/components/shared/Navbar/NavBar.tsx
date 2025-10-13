import { fetchCategories } from "@/services/category.service";
import { UserType } from "@/types/user";
import ClientNavBar from "./ClientNavBar";

export default async function NavBar({ auth }: { auth: UserType | null }) {
  const categories = await fetchCategories(); // отримуємо з бекенду

  return <ClientNavBar auth={auth} categories={categories} />;
}
