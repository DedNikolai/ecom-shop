import type { Metadata } from "next";
import NavBar from "@/components/shared/Navbar/NavBar";
import { authMeServer } from "@/services/auth.server"; 
export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authMeServer(); 
  return (
    <main>
        <NavBar auth={user} />
        {children}
    </main>
  );
}
