"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export const SidebarLink = ({
  href,
  label,
  icon: Icon,
  badge,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all",
        isActive
          ? "bg-white/10 text-white shadow-md"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <span className="relative w-5 h-5">
        <Icon
          className="w-5 h-5 stroke-[1.5] text-blue-300 group-hover:scale-110 transition-transform"
          style={{ stroke: "url(#gradient-icon)" }}
        />
      </span>
      <span>{label}</span>
      {badge && (
        <span className="absolute right-4 top-2 bg-red-500 text-xs text-white px-2 py-0.5 rounded-full animate-pulse">
          {badge}
        </span>
      )}
    </Link>
  );
};