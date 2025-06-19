"use client";

import { useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function useServerUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return setUser(null);
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return user;
}