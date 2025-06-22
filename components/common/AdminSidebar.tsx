"use client";

import { SidebarLink } from "./AdminSidebarLink";
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  LogOut,
  Menu,
  ChartBarStacked
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import useServerUser from "@/lib/hooks/useServerUser";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users, badge: "4" },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/category", label: "Category", icon: ChartBarStacked  },
];

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useServerUser();

  return (
    <>
      {/* Gradient definition for SVG stroke */}
      <svg width="0" height="0">
        <linearGradient id="gradient-icon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#4f46e5" offset="0%" />
          <stop stopColor="#06b6d4" offset="100%" />
        </linearGradient>
      </svg>

      <aside
        className={`min-h-screen bg-gradient-to-br from-indigo-800 to-cyan-400 text-white shadow-xl transition-all duration-300 ease-in-out 
  ${collapsed ? "w-20" : "w-64"} flex flex-col px-4 py-6 relative`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 bg-white text-black rounded-full p-1 shadow-md z-10"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Avatar + Name */}
        {!collapsed && (
          <div className="flex items-center gap-3 mb-10 px-2">
            <Image
              src={`https://ui-avatars.com/api/?name=${
                user?.firstName ?? "S"
              }+${user?.lastName ?? "B"}&format=png`}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="text-base font-semibold">{`${user?.firstName} ${user?.lastName}`}</div>
              <div className="text-sm text-white/60">{user?.role}</div>
            </div>
          </div>
        )}

        {/* Sidebar Links */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scroll">
          {links.map((link) => (
            <SidebarLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Bottom logout + bell */}
        <div className="mt-auto space-y-2">
          <SidebarLink
            href="/admin/notifications"
            label="Alerts"
            icon={Bell}
            badge="3"
          />
          <Button
            variant="ghost"
            className="w-full justify-start text-white/80 hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </aside>
    </>
  );
};
