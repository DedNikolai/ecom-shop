import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "E-commerce admin panel",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
