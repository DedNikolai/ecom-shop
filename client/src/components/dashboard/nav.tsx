import { protectedRoutes, publicRoutes } from "@/app/api/client.routes";
import { NavItem } from "@/types/navItem.type";
import {
    ShoppingCart, Package, Users, BarChart2, Settings, LayoutDashboard, Menu, Search, BadgePercent, Truck, ShoppingBagIcon, TargetIcon,
    Blinds
  } from "lucide-react";

export const NAV: NavItem[] = [
    { href: protectedRoutes._DASHBOARD, label: "Home", icon: <LayoutDashboard className="h-4 w-4" />, exact: true },
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
  