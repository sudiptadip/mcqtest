"use client";

import { LogOut, Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import useServerUser from "@/lib/hooks/useServerUser";
import { SidebarLinkItem, sidebarLinks } from "./sidebarLinks";
import { SidebarLink } from "./AdminSidebarLink";

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const { user } = useServerUser();

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const renderLink = (item: SidebarLinkItem) => {
    if ("href" in item) {
      return <SidebarLink key={item.href} {...item} />;
    }

    // Dropdown section
    return (
      <div key={item.label}>
        <button
          onClick={() => toggleDropdown(item.label)}
          className="flex items-center w-full text-left text-white/90 hover:text-white px-2 py-2 rounded-lg transition-all duration-200"
        >
          <item.icon className="w-5 h-5 mr-3" />
          {!collapsed && <span className="flex-1">{item.label}</span>}
          {!collapsed &&
            (openDropdowns[item.label] ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            ))}
        </button>

        {!collapsed && openDropdowns[item.label] && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child) =>
              "href" in child ? (
                <SidebarLink key={child.href} {...child} />
              ) : null
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
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
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 bg-white text-black rounded-full p-1 shadow-md z-10"
        >
          <Menu className="w-4 h-4" />
        </button>

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
              <div className="text-sm text-white/60">{user?.email}</div>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scroll">
          {sidebarLinks.map(renderLink)}
        </nav>

        <div className="mt-auto space-y-2">
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
