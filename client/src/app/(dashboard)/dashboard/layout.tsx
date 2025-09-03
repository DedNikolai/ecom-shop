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
        <div>DashBoard Menu</div>
        {children}
    </main>
  );
}
