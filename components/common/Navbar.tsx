"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useServerUser from "@/lib/hooks/useServerUser";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ToastNotify from "../commonJs/ToastNotify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useServerUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
      } else {
        ToastNotify("Logout failed", "error");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Exam", href: "/exam" },
    { name: "News", href: "/news" },
    { name: "Practice", href: "/practice" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href={"/"} className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-blue-600">✔ Exams</div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center space-x-8 text-sm font-medium text-gray-700 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-blue-600">
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <div className="flex items-center gap-4">
              {!user ? (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-indigo-600"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${
                        user?.firstName ?? "S"
                      }+${user?.lastName ?? "B"}&format=png`}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.firstName}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4">
          <ul className="space-y-4 text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block hover:text-blue-600">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Section */}
          {!user ? (
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex items-center gap-3">
                <Image
                  src={`https://ui-avatars.com/api/?name=${
                    user?.firstName ?? "S"
                  }+${user?.lastName ?? "B"}&format=png`}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="text-gray-800 font-medium">
                  {user.firstName}
                </span>
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
