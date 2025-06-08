"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href={"/login"}>
              <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                Log in
              </Button>
            </Link>
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
        <div className="md:hidden px-6 pb-4">
          <ul className="space-y-4 text-sm font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block hover:text-blue-600">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Button className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-700">
                Log in
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
