"use client";

import { useEffect, useState } from "react";
import { getUser, isAuthenticated, logout as logoutUser } from "@/lib/auth";
import { User } from "@/types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    }
    setLoading(false);
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return { user, loading, isAuthenticated: !!user, logout };
};