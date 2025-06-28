// sidebarLinks.ts
import {
  LayoutDashboard,
  Users,
  Settings,
  ChartBarStacked,
  Newspaper,
  Minimize,
  BookCheck,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type SidebarLinkItem =
  | {
      label: string;
      icon: LucideIcon;
      href: string;
      badge?: string;
    }
  | {
      label: string;
      icon: LucideIcon;
      children: SidebarLinkItem[];
    };

export const sidebarLinks: SidebarLinkItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users, badge: "4" },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  {
    label: "Create Category",
    icon: ChartBarStacked,
    children: [
      { label: "Category", href: "/admin/category", icon: ChartBarStacked },
      {
        label: "Category List",
        href: "/admin/category-list",
        icon: ChartBarStacked,
      },
    ],
  },
  {
    label: "News",
    icon: Newspaper,
    children: [
      {
        label: "News Category",
        href: "/admin/news/news-category",
        icon: Minimize,
      },
      { label: "Exam", href: "/admin/news/exam", icon: BookCheck },
      { label: "News", href: "/admin/news", icon: Newspaper },
    ],
  },
];