import { LogoutButton } from "@/components/shared/LogoutButton/LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DashBoard",
  description: "DashBoard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <div className="flex justify-between p-5">
          <div>Menu</div>
          <LogoutButton />
        </div>
        {children}
    </main>
  );
}
